# z16: Sample crossing diagnostics — mathematical author and independent review prompt

Use the adjacent `descriptor.json` as the frozen implementation contract. Verify its source hashes before changing this axis. The actual registry descriptor, engine result version and projection versions are distinct fields; do not silently equate them.

## Astra mathematical author

An authenticated **gpt-6-astra** author must state the precise claim and implement only the authorized scope. **gpt-6.1-sol may perform engineering only** (packaging, UI, wiring, documentation mechanics); it must not substitute for mathematical authorship or approval. Naming a model in text is not evidence of its actual use.

For this axis the current computation is:

Center each scaled coordinate by its sample mean; count strict sign products <0 between adjacent centered samples and raw samples. Rate=centered_count/(2*(t_last-t_first)/Ts).

Operational scope: **trajectory only**. Units/convention: counts dimensionless; rates inverse scaled time. Work with y=D^-1 x, tau=t/Ts, g=Ts D^-1 f(t,Dy), J=Ts D^-1 A D unless the formula explicitly returns physical coordinates. Use L2, with Frobenius only where specified.

The critical mathematical boundary is: **Zeros are not counted as crossings, sparse sampling aliases oscillation, sample-mean centering is window-dependent; no periodicity theorem.**

Explain why each dependency in descriptor.json is necessary. Preserve separate declared, numerical, analytic and independently certified evidence. No bound-certificate adapter is implemented for this axis. Do not invent a certificate route. Preserve null/failure semantics; a zero value must represent an actual measured/derived zero. Inspect full_original_window and reference provenance; partial observations must not silently acquire full-horizon scope.

Required axis-specific example specifications:

- **positive — proposed, not executed as written:** Exact x(t)=cos(pi*t), stored t=[0,1,2,3], unit scales. Expected: raw and centered crossings=3; centered half-crossing rate=0.5.
- **counterexample — proposed, not executed as written:** Same oscillation sampled at t=[0,2,4]. Expected: All samples equal 1, crossings=0; oscillation is missed.
- **degenerate — proposed, not executed as written:** Single point or constant trajectory. Expected: Single point is blocked for multiple-times requirement; constant multi-time trajectory has zero crossings.

These examples are proposed, not run by this document. Produce actual isolated-run artifacts with the input, expected assertion, observed value/status, tolerances, code hash and complete output. Related existing test references are in descriptor.json and must not be relabeled as execution of a different example.

For a new or changed evaluator, prepare an `evaluator_proposal_v1` submission conforming to `../../evaluator-proposal-contract.json`: mathematical definition, supported scopes/evidence, units, versioned projections, dependencies/execution contract, primary sources or explicit derivation artifacts, and these positive/counterexample/degenerate cases. State what is unproved. Never execute submitted untrusted source on the host; use the reviewed isolated runner.

## Independent Astra reviewer

A **different authenticated gpt-6-astra reviewer** must inspect the actual implementation and source hashes, independently derive the formulas and all expected examples, check scaling and scope, verify null cases and each projection's version/evidence acceptance, and inspect real test artifacts. For z16, explicitly challenge this failure mode: Same oscillation sampled at t=[0,2,4]. The required distinction is: All samples equal 1, crossings=0; oscillation is missed.

Also inspect the degenerate boundary: Single point or constant trajectory. Expected handling: Single point is blocked for multiple-times requirement; constant multi-time trajectory has zero crossings. Do not accept a sampled or declared property as a theorem. Record accepted/rejected/unresolved findings and limitations, exact proposal and implementation SHA256, reviewer identity, model provenance and review artifact hash. A copied approval flag or self-declared model name is insufficient. The author cannot approve their own mathematics.

Return missing evidence when any obligation is absent. `ready_for_governed_execution` is workflow readiness only; this prompt and its examples do not certify mathematical truth or authorize automatic deployment. Do not replace numerical measurement fields with certified domain bounds; preserve the separately bound claim route where implemented.
