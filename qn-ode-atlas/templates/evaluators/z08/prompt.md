# z08: L2 logarithmic norm — mathematical author and independent review prompt

Use the adjacent `descriptor.json` as the frozen implementation contract. Verify its source hashes before changing this axis. The actual registry descriptor, engine result version and projection versions are distinct fields; do not silently equate them.

## Astra mathematical author

An authenticated **gpt-6-astra** author must state the precise claim and implement only the authorized scope. **gpt-6.1-sol may perform engineering only** (packaging, UI, wiring, documentation mechanics); it must not substitute for mathematical authorship or approval. Naming a model in text is not evidence of its actual use.

For this axis the current computation is:

Dense mode: mu2(J)=lambda_max((J+J^T)/2), return sampled min/max. Above max_dense_dimension use up to four normalized cosine-direction Jv probes at the middle stored state; these are not mu2.

Operational scope: **point or trajectory; separate certified domain claim allowed**. Units/convention: inverse scaled time. Work with y=D^-1 x, tau=t/Ts, g=Ts D^-1 f(t,Dy), J=Ts D^-1 A D unless the formula explicitly returns physical coordinates. Use L2, with Frobenius only where specified.

The critical mathematical boundary is: **A finite set of Rayleigh quotients gives sampled directions, not the largest eigenvalue or a global upper bound.**

Explain why each dependency in descriptor.json is necessary. Preserve separate declared, numerical, analytic and independently certified evidence. Supported independently verified bound claim kind contraction. Concrete certificate must bind authoritative expression AST, parameters, state box, requested time interval, and scales; the independent verifier recomputes it. Numeric output remains separate. Preserve null/failure semantics; a zero value must represent an actual measured/derived zero. Inspect full_original_window and reference provenance; partial observations must not silently acquire full-horizon scope.

Required axis-specific example specifications:

- **positive — proposed, not executed as written:** J=-I, unit scales. Expected: Dense mu2=-1; a verified separate contraction certificate may establish a domain upper bound.
- **counterexample — proposed, not executed as written:** A=[[-1,10],[0,-1]]. Expected: mu2=4 despite spectral abscissa -1, so eigenvalue stability is not contraction.
- **degenerate — proposed, not executed as written:** n=65, default dense cap 64. Expected: Return directional_rayleigh_quotients and sampled_Jv_norms; mu2 numeric projection is null.

These examples are proposed, not run by this document. Produce actual isolated-run artifacts with the input, expected assertion, observed value/status, tolerances, code hash and complete output. Related existing test references are in descriptor.json and must not be relabeled as execution of a different example.

For a new or changed evaluator, prepare an `evaluator_proposal_v1` submission conforming to `../../evaluator-proposal-contract.json`: mathematical definition, supported scopes/evidence, units, versioned projections, dependencies/execution contract, primary sources or explicit derivation artifacts, and these positive/counterexample/degenerate cases. State what is unproved. Never execute submitted untrusted source on the host; use the reviewed isolated runner.

## Independent Astra reviewer

A **different authenticated gpt-6-astra reviewer** must inspect the actual implementation and source hashes, independently derive the formulas and all expected examples, check scaling and scope, verify null cases and each projection's version/evidence acceptance, and inspect real test artifacts. For z08, explicitly challenge this failure mode: A=[[-1,10],[0,-1]]. The required distinction is: mu2=4 despite spectral abscissa -1, so eigenvalue stability is not contraction.

Also inspect the degenerate boundary: n=65, default dense cap 64. Expected handling: Return directional_rayleigh_quotients and sampled_Jv_norms; mu2 numeric projection is null. Do not accept a sampled or declared property as a theorem. Record accepted/rejected/unresolved findings and limitations, exact proposal and implementation SHA256, reviewer identity, model provenance and review artifact hash. A copied approval flag or self-declared model name is insufficient. The author cannot approve their own mathematics.

Return missing evidence when any obligation is absent. `ready_for_governed_execution` is workflow readiness only; this prompt and its examples do not certify mathematical truth or authorize automatic deployment. Do not replace numerical measurement fields with certified domain bounds; preserve the separately bound claim route where implemented.
