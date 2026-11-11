# 算法插件与两比特量子演示

## 提交、审查与真实运行

用户源文件走 `qn_atlas.quantum.submitted.execute_submitted`，不是内置方法的动态导入。流程为：提交源文件与 manifest → 对精确 source SHA256 和 manifest SHA256 做科学审查与测试 → 服务端保存批准版本 → benchmark 作业绑定同一 revision/两个哈希 → 可信 Linux 容器 worker 创建私有 SandboxContext → 隔离子进程加载代码 → 可信 Aer 运行器执行其电路 → 子进程及后代终止 → 独立计算参考并评估。修改任何源代码或 manifest 都必须重新批准，payload 中的 `approved=true` 没有授权效力。

manifest 必需 `plugin_id`、`revision`、`source_sha256`、`kind='quantum'` 和 `contract_version='reviewed_qiskit_plugin_v1'`。运行请求包含 `plugin_source`、`manifest`、`problem`、`scenario`、`task`、`config`；批准记录来自服务端作业顶层而非该请求的自报字段。可附 `review` 作额外交叉检查，但它不能授予执行权限。尚无真实 Linux-VM sandbox 验收凭据时返回 `sandbox_required`，不能回退到控制器或 Windows 主机执行上传代码。

源文件约定四个函数：

```python
def supports(problem, task):
    return {'status': 'supported'}  # 或 unsupported/unknown，并给原因

def prepare(problem, task, config):
    return {'iteration': 0}  # 仅由输入构造，运行状态留在子进程内

def build(prepared, feedback):
    # feedback 是可信运行器此前产生的所有 artifact，可驱动多轮优化。
    # 返回 None 结束；每轮返回 {'circuits': [...]}。
    # 每项：{'kind': 'statevector'|'sampler'|'estimator', 'circuit': qc,
    #        'shots': ... (sampler), 'observable': SparsePauliOp(...) (estimator)}
    ...

def decode(results, prepared):
    # 只选择真实 artifact 与事先注册的 task.encoding；不能重写数值。
    return [{'artifact_id': results[-1]['artifact_id'], 'encoding': ...}]
```

首版要求完全绑定参数的电路，不接受动态控制流。sampler 电路由可信运行器统一添加最终全寄存器测量，避免插件伪造 bit-order；因此插件不得预置经典寄存器或测量指令。statevector/estimator 接受无测量、无 reset 的电路。estimator 当前只作为优化反馈；最终可评分输出选择真实 statevector 或 samples，不能把任意 Pauli 期望值谎称为注册任务算子。更一般的测量电路、经典数值重构与噪声模型需要后续版本契约。

运行时传给 supports/prepare 的 problem 会附上 `scenario` 字段，保存调用方的原始场景。完整四函数实现见 `qn_atlas/quantum/submitted_vqls_example.py`：它请求8轮、每轮6个真实电路期望值，用中心有限差分更新3角度，然后请求模拟态与最终采样，共50次可信电路调用。这里没有把 controlled-RY 错当成满足简单两项 Pauli parameter-shift 公式；有限差分步长明确为10⁻⁴。示例只用输入构造初值和小型提升问题，不访问参考或经典线性解。

该示例源文本的审查版本为 `fixture_v1`，固定 SHA256 为 `f3473ba981affc2c450235465392b9427335471885bc84a089482815a1e59cd0`；它是仓库验收版本，不等于用户上传后的生产批准。实际发布要把源代码、依赖镜像和测试证据绑定到新的服务端审查记录。以下代码只应由已有可信 worker context 的受控入口调用，不能在控制器上创建批准 context：

```python
from qn_atlas.quantum.submitted import execute_submitted, source_digest
from qn_atlas.quantum.finite_lift_vqls import short_time_demo, ENCODING

def run_approved_package(source, reviewed_revision, worker_private_context):
    manifest = {
        'plugin_id': 'finite_lift_vqls_submitted',
        'revision': reviewed_revision,
        'kind': 'quantum',
        'contract_version': 'reviewed_qiskit_plugin_v1',
        'source_sha256': source_digest(source),
    }
    demo = short_time_demo()
    return execute_submitted({
        'plugin_source': source, 'manifest': manifest, 'problem': demo,
        'scenario': {'x0': demo['x0'], 't_span': demo['t_span']},
        'task': {'output_type': 'state_preparation', 'epsilon': .01,
                 'encoding': ENCODING},
        'config': {'final_shots': 8192},
    }, context=worker_private_context)
```

worker context 必须已经批准上述精确 manifest 的哈希；仅在请求内重新计算 source hash 不会授予权限。参考构建和独立 evaluator 调用必须位于 `execute_submitted` 返回且 `child_terminated_before_return` 为真之后。当前实验只通过显式固定仓库 fixture 路径执行，`vm_isolation_verified=false`；没有实际 VM 验收记录时，上述生产调用会拒绝执行。

可信运行器在载入电路后独立检查 qubits、指令数、实际电路调用数和累计 shots，并生成资源账本。decoder 仅能返回 `artifact_id` 与完全匹配任务的 `encoding`；不存在的 artifact、错编码、额外数值字段和自报精度一律拒绝。样本和模拟态均来自真实 Aer 执行，JSON 只能携带 QPY 电路与普通数据，父进程不导入用户模块。优化精确期望的 shots 为0，与采样调用实际消耗独立累计，绝不声称整体量子成本为0。

为保持最终测量区间的固定实验语义，首版只允许一个 sampler，并要求它是最后一轮的最后一个电路；采样后再请求任何电路都会拒绝。不能生成多个样本结果后选择最有利的一个，也不把重复固定种子的结果拼成独立样本。跨实例置信结论另需独立抽样设计，不能从本接口自动获得。

量子算法子进程只得到问题、场景、任务定义和配置，不得到参考解、目标状态或隐藏数值轨迹。父进程在创建子进程前禁用 dumpability，减少同 UID 子进程经 `/proc`/ptrace 访问父进程的风险。Linux 子进程在导入用户源之前必须成功加载 libseccomp 规则，禁止 setsid/setpgid 脱离独立进程组，以及 ptrace、process_vm 访问和 namespace 切换；缺库或规则失败即拒绝加载。父进程终止该进程组后才返回，防止后台后代跨入随后生成参考的阶段。容器仍必须具有禁网络、只读根文件系统、无凭据/参考数据挂载以及独立强制超时。此 Python 协议不是操作系统隔离替代品。同 UID 子进程隔离与容器安全必须由实际 VM 验收核实，不能仅靠单元测试声称成立。

测试入口仅允许模块内固定、已审阅的 fixture 源码哈希；显式 `trusted_fixture` 模式记录 `vm_isolation_verified=false`，不能运行任意上传源。新坐标 evaluator 可复用独立子进程协议的 axis 模式；其声明的数值能力经独立通道传入，与量子算法禁读目标的规则分开，且输出不具有自我认证权限。

当前 Linux x86_64/aarch64 子进程策略还禁止 fork/vfork、非线程 clone 与 clone3（后者返回 ENOSYS 供线程库回退），允许同一进程内线程。首版用户插件不得启动额外进程；缺少所需内核/库能力时失败关闭，不降低隔离要求。

`qn_atlas.quantum.execute(payload, limits=None)` 是允许列表调度入口，不加载上传的 Python 路径或任意代码。`payload` 包含 `method_id`、`problem`、可选 `scenario`、`task` 和 `config`。已有经典适配器为 Carleman、HPM 和 Liouville；HAM 仅有不支持的研究路线描述。`negative_control` 是验收夹具，不是科学求解器。

问题采用 `qn_atlas.contracts.ODEProblem` 或相应安全表达式字典。初值与时间窗属于 scenario；插件不改写目录中的原始时间窗。外部字典给出的 `polynomial` 不是结构证明，VQLS 每次从权威表达式/AST 重新生成有理多项式。普通注册数值回调未提供该结构证据时拒绝此演示插件，不把采样得到的系数当作全局结构证明。

结果 schema 为 `quantum_plugin_v1`，包含 `status/reason`、`outputs`、`encoding`、`resources`、`diagnostics`、`provenance`。`status=success` 只说明执行完成，不说明 ODE 精度达标。`outputs` 区分 `statevector`、`density_matrix`、`samples`、`expectation`、`classical_quantity` 和 `trajectory`；复数数组用 `{real,imag}` 保存。精度由独立评估器计算，不接受插件自报通过。

## 可运行入口

```python
from qn_atlas.quantum import execute
from qn_atlas.quantum.finite_lift_vqls import short_time_demo, ENCODING

result = execute({
    'method_id': 'finite_lift_vqls',
    'problem': short_time_demo(),
    'task': {'output_type': 'state_preparation', 'epsilon': .01,
             'encoding': ENCODING},
    'config': {'seed': 1729, 'optimization_mode': 'ideal_expectation'},
}, limits={'max_qubits': 12, 'max_objective_calls': 64,
           'final_shots': 8192, 'timeout_seconds': 60})
```

`short_time_demo_v1` 是独立新增场景：x₀=0.25、y₀=0.5、原窗 [0,0.01]，不是缩短后的目录实例。普通分层120例仍使用目录原场景；零个支持实例也是合法的覆盖结论。依赖不可用返回 `dependency_unavailable`，不能把跳过测试称为电路验证。

## 数学构造与支持范围

演示支持 x′=−a x、y′=−b y+g x²，a,b∈[0.5,2]、|g|≤1、0<T≤0.05、初始各分量绝对值≤1且物理向量非零。也识别交换变量后的同型方程，但保存 driver/response 置换并在输出电路上恢复原问题次序。这里是实现支持范围，不是完整精度认证区域。

u=(x,y,x²) 满足精确有限闭合 u′=Au。只做一个隐式 Euler 步 M=I−TA，右端为初始 u₀。将 M 补成四维、u₀ 补零，用真实两比特电路最小化 H=M†(I−|b̂⟩⟨b̂|)M 的归一化期望。三角度电路用高位 RY 与两条分支上的 controlled-RY 表达全部实四维单位向量。初始参数仅由输入 u₀ 和固定种子的小扰动产生。

插件不求 M⁻¹u₀，不调用 ODE 求解器或矩阵指数，不取 H 的最低本征向量，不读取参考解。4×4 矩阵构造、SVD 范数/条件数、Pauli 分解是明确记录的经典预处理；这些密集操作不建立高维高效 oracle。经典优化器执行真实 Aer 电路期望值调用，而不是直接求解状态。该成本是 VQLS 全局残差构造，不自动继承其他代价定义的误差定理。

## 编码、测量与精度

编码为 Qiskit 小端：整数基底0、1分别对应原问题第一、第二分量，2为提升分量，3为填充。后选择 qubit 1=0，物理 qubit 为0。`encoding` 保存 `num_qubits=2`、`system_qubits=[0]`、`postselect={'1':0}`、`physical_basis_indices=[0,1]`。物理态由独立评估器按任务中的权威编码提取；错编码不得静默接受。

执行产生完整模拟态和最终测量样本两个输出。理想态只作为模拟器数值审计，不声称硬件能免费读取全态。样本保留 PUB 索引、广播单元索引、寄存器名、每个 shot 的顺序和 counts；跨寄存器不能把边缘频数拼成不存在的联合分布。读出自然态期望 O=diag(0,1) 时，仅使用高位为0的真实存活样本；低存活数导致不确定性增加，不能丢弃后选择成本。

本示例不恢复范数、符号和全局相位，不能输出经典末端分量或完整轨迹，更不能用点态代替集合均值。自然态任务建议新profile ε=0.01，指定期望值 ε=0.05、请求置信度0.99；它们不覆盖旧目录ε=10⁻³任务。有限shots不能保证任何后选择率下都达标。零物理态或未定义参考必须保留未定义状态。

## 资源与退出

框架硬上限是12 qubits、64次实际目标调用、8192次最终读出shots和60秒。当前演示只有2 qubits。优化模式是 Aer EstimatorV2 precision=0 的精确模拟期望，`optimization_shots=0`；不能将 Aer 的非零 precision 高斯扰动冒充实际计数shots。最终 SamplerV2 的8192shots与优化调用分开，来源及计数保存。模拟态审计另记一次模拟执行。

插件在调用前后检查时间；阻塞的本地 Aer/native 调用不能被此检查硬中断。生产运行器必须使用独立进程/容器监督，超时终止整个任务。实际门数仅标记 Aer 编译目标，不等于硬件原生门数。输入oracle、容错、成功概率放大和硬件时间未评估时为未知，不填零、不宣称加速。达到调用上限时保留最后有效输出，但状态为 `budget_exceeded`，不伪造收敛。

## 验收及适用域

先核对精确提升与离散线性问题，再比较连续ODE参考；后者还含单步时间离散误差。时间窗T=2的域外挑战不能冒充支持域实例，即使精确解出线性系统也可能不满足连续ODE精度。负控覆盖错解码、零后选择概率、优化未完成和不支持输入。量子态标量负控与平衡点负控由评估器另行标记。

报告应固定任务、ε、时间窗、配置和预算后给出观测范围、分箱计数、相邻失败点与未知项，不把成功样本min/max之间的全部区间宣称已认证。理论覆盖、经典前端数值支持、真实电路模拟证据与端到端成本是独立层。

来源：[VQLS原始论文](https://arxiv.org/abs/1909.05820)、[Aer EstimatorV2](https://qiskit.github.io/qiskit-aer/stubs/qiskit_aer.primitives.EstimatorV2.html)、[Aer SamplerV2](https://qiskit.github.io/qiskit-aer/stubs/qiskit_aer.primitives.SamplerV2.html)。实际依赖版本从运行环境读取并记录，不以文档版本代替。

## 候选版本验证与批量支持筛查

候选版本先接受独立静态科学审核，再通过 `quantum.validation.validate_candidate_package` 运行真实测试，最后才能申请激活。科学提案使用 `quantum_plugin_proposal_v1`，包含具名 `author`、精确 manifest 和至少 positive、counterexample、degenerate 三类 examples。每例绑定 input、受限 oracle 和 expected；正例必须请求独立精度通过。静态审核必须绑定完整提案哈希、非空且不同于作者的 reviewer_id、数学审核发现、审核记录与来源检查。提案本身不能提供任意 Python 参考代码或自证通过。

私有准入目的必须是 `validation_only`，并绑定 source/manifest/revision、全部示例哈希和审核记录 ID；普通执行许可不能代用。子进程只收到算法输入，退出后可信父进程才计算三角闭式或独立数值参考；任务时间必须与实际场景末端相同。实际执行、独立评分和失败原因形成测试 artifact，其 SHA256 按 UTF-8 `canonical_json(record)+'\n'` 计算。只有真实获准容器的通过记录可用于激活；固定主机测试夹具即使全部通过也不生成激活许可。这些测试证明指定例子的执行与误差，不证明一般正确性或量子优势。

`screen_support_batch(payloads, source, manifest, context, limits)` 在一次隔离子进程中仅调用 supports，最多256例且输入不超过1 MiB。它不调用 prepare/build/decode，不执行量子电路，也不读取参考解。按次序返回逐例支持判定；异常或超时未完成的样本保持 unknown，不能计为 unsupported。生产硬超时由独立运行器保证；固定夹具记录明确区分于 Linux 容器验收。
