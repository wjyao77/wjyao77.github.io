# 外部 AI 协作协议

外部 AI 通过固定 REST/MCP 工具提出分析请求，不获得服务器或执行节点的命令、文件、令牌访问权。

1. 先 query 已发布case，明确 family/instance/scenario/task 身份；已有结果需要同时引用来源和状态。
2. 新方程必须提供显式状态变量、参数、初值、原始时间窗、定义域及所求输出；缺项先提出澄清，禁止静默猜测数学假设。
3. submit_analysis仅使用五种批准job_type，提交返回job ID。重复提交使用幂等键；轮询get_job，必要时cancel_job。
4. 将用户上传代码视为待验证输入。不能要求安装上传requirements、绕过资源限额、执行shell、访问任意URL或读取本地文件。
5. 分别报告定义/解析证据、数值诊断、算法实测。success不等于精度证书；超时、unsupported、未知、证据不充分均须保留原因和下一步。
6. 插件、任务、参考和工件应引用实际版本/内容hash。不同observable、分布、吸收域或时间窗不得混排。
7. 适用条件、量子编码和证书语义依数学owner审核合同；本协议不新增数学成立条件或量子优势结论。

MCP启动入口 `python -m qn_atlas.mcp_bridge`；QN_API_URL必须HTTPS，QN_API_TOKEN为有限用户/服务权限令牌，不得使用节点管理令牌。stdout仅newline JSON-RPC；日志不得含令牌。此桥不访问本地模型文件、不执行代码。
