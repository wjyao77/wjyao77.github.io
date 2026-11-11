# Independent axis evaluators

`qn_atlas.evaluators` contains twenty built-in modules named `axis_z01` through
`axis_z20`. Each exposes `DESCRIPTOR` and `evaluate(problem, scenario, context)`.
The registry discovers these modules and permits additional reviewed plugins;
twenty is an initial collection, not a permanent schema limit. Registering a
callable is a trusted application operation, not a submission approval workflow.

```python
from qn_atlas.contracts import problem_from_payload, scenario_from_payload
from qn_atlas.evaluators import EvaluationContext, evaluate, project_results

problem = problem_from_payload({"variables": ["x"], "expressions": ["-x"]})
scenario = scenario_from_payload({"x0": [1], "t_span": [0, 1]}, problem)
context = EvaluationContext(problem, scenario, reference=reference_result)
results = evaluate(problem, scenario, context, axis_ids=["z08", "z09", "z19"])
projections = project_results(results)
```

Inputs can be contract objects, mappings with numerical `rhs`, a directly supplied
`rhs(t,x)` or `rhs(t,x,parameters)` function, or registered cases. Expressions
are rebuilt through the authoritative contract compiler, rather than trusting
a separately supplied callback or polynomial flag. Opaque callable identity
cannot describe changes to hidden closure/global/external state: callers must
version and freeze these dependencies. The context rejects changed problem and
scenario data or replacement callbacks and cannot be reused for other objects.

Without a supplied reference, a trajectory-dependent evaluator requests one
reference integration. Passing a failed reference preserves that failure and
does not silently rerun it. Explicit `sampling_scope="point"` requests initial-
point diagnostics instead. Supplied references are checked for shape, finiteness,
increasing times, requested-window containment, initial-state consistency when
they start at the original initial time, and any supplied identity hashes.
Missing identity hashes are reported as `external_unverified_identity`, even if
the initial state and window checks pass. Reference error remains a separate
numerical uncertainty; these checks are not an accuracy certificate.

## Shared lazy computation

The context memoizes successes and failures of `static`, `trajectory`,
`rhs_samples`, `jacobians`, `spectra`, `directional_derivatives`, and `tangent`.
z19 requests only the trajectory and never evaluates derivatives. z08/z09/z11/
z13/z14 share one Jacobian sample cache; z08/z13/z14 share spectra. z15 requests
the tangent-model node. Failure of a trajectory does not prevent z01 or supplied
structural declarations from being returned. Each evaluator returns separately.
No evaluator runs the entire old twenty-axis `enrich_features` routine.

Numerical formulas preserve the explicit semantics of `diagnostics.py`: positive
diagonal state scaling and positive time scaling, L2 norm, fixed-time directional
second differences, sampled symmetric-part eigenvalues and traces, spectral
rate proxies, and a linearly interpolated sampled-Jacobian tangent surrogate.
The last is not a validated original variational flow or Lyapunov exponent.
Dense Jacobians default to dimension at most 64; larger z08 requests use four
directional probes, leaving the full mu2 projection unavailable. Nonsmooth or
switched systems do not receive the classical tangent surrogate.

## Result and evidence contract

Axis version `2` separates `execution_status` (completed, blocked, failed,
budget_exceeded, unsupported), `proposition_truth` (true, false, unknown), `value`,
`evidence_type`, `scope`, `measurements`, `claims`, `missing`, `sources`,
`limitations`, and `provenance`. An estimated measurement does not automatically
decide a proposition. Unknown values are null; zero is never an imputation.
The top-level truth describes only the named primary proposition, while each
supplementary claim carries its own truth and scope.

Existing family statements enter as `declared`, including their sources. The
legacy applicability checker is not a proof checker. A missing candidate or
failed computation cannot make a property false. Small invariant drift, curl,
return distance or trajectory rank remains a numerical screen, not a theorem.
The conservative `legacy_view(results)` adapter maps measurements to estimated
and only dimension to known; it does not discard certificate domain bindings
by upgrading other values to legacy known.

## Optional exact certification

`context.certification_results` maps selected axis identifiers to certificate
artifacts. The default adapter reconstructs an expected exact problem from the
actual authoritative AST and the scenario's explicit lower/upper box, times and
scales. It independently verifies against that expected problem. Submitted
`verified: true` flags are insufficient. Missing boxes, mismatched domains or
times and unsupported ASTs remain blocked/failed certification attempts, while
numerical measurements remain available.

`build_expected_problem(problem, scenario)` is shared with the producer entry
point. Float coordinates bind their exact binary rational values; rational
strings remain exact rational strings converted to canonical rational pairs.
The adapter never silently rounds a float to a convenient decimal. Certificates
for separately requested boxes remain separate artifacts unless explicitly
bound to the same scenario. Fixed parameters are supported by this adapter;
uncertain parameter boxes require a separate explicit problem contract.

Verified claims are appended to `claims` with exact values and domain/time/
parameter/scale bindings. They do not replace the numerical top-level value or
its trajectory scope. Certificate IDs hash the complete artifact, not merely
the model. Independent verification shares the remaining context deadline.
An optional verifier callback is a trusted application capability and must not
be accepted from untrusted submission data.

## Numeric projections

`project_results` returns named projection records plus `vector` and `mask`.
Projection registration is extensible. Every projection declares source axis
version, field, accepted evidence and scopes. The scalar value is null unless
all checks pass. Categories are not assigned ordinal numbers. Reference window,
coordinates and evidence accompany each value; downstream similarity queries
must enforce comparable windows/scales and report common valid dimensions.

Examples are `z08.mu2.sample_max.v1`, `z09.divergence.sample_max.v1`,
`z15.surrogate.terminal_log_gain.v1`, and `z19.scaled_norm.sample_max.v1`.
The certified `z08.mu2.domain_upper_bound.v1` and
`z09.divergence.domain_upper_bound.v1` select independently verified claims,
never sampled maxima. Exact rational bounds remain in the projection and their
floating display values are rounded upward when necessary; unavailable or
overflowed values remain null.

Legacy exports may use an explicit semantic migration adapter. Such records
must retain `source_axis_version`, adapter version and `not_new_evaluation`.
Matching a field name alone is not sufficient where semantics changed: the old
trajectory Jacobian variation is not the fixed-time directional curvature,
and eigenvalue modulus ratio is not real-part rate separation. Original evidence
and artifacts must remain intact.
