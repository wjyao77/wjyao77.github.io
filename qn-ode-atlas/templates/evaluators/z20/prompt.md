# z20: Sample trajectory rank — mathematical author and independent review prompt

Use the adjacent `descriptor.json` as the frozen implementation contract. Verify its source hashes before changing this axis. The actual registry descriptor, engine result version and projection versions are distinct fields; do not silently equate them.

## Astra mathematical author

An authenticated **gpt-6-astra** author must state the precise claim and implement only the authorized scope. **gpt-6.1-sol may perform engineering only** (packaging, UI, wiring, documentation mechanics); it must not substitute for mathematical authorship or approval. Naming a model in text is not evidence of its actual use.

For this axis the current computation is:

Center stored scaled-state matrix Y by column means, compute singular values s; threshold=max(Y.shape)*machine_epsilon*s0 (0 if none); return s and number strictly above threshold.

Operational scope: **point or trajectory**. Units/convention: singular values in scaled-state units; rank dimensionless. Work with y=D^-1 x, tau=t/Ts, g=Ts D^-1 f(t,Dy), J=Ts D^-1 A D unless the formula explicitly returns physical coordinates. Use L2, with Frobenius only where specified.

The critical mathematical boundary is: **Rank of a finite sampled trajectory is not exact symmetry, invariant manifold dimension or linearization proof.**

Explain why each dependency in descriptor.json is necessary. Preserve separate declared, numerical, analytic and independently certified evidence. No bound-certificate adapter is implemented for this axis. Do not invent a certificate route. Preserve null/failure semantics; a zero value must represent an actual measured/derived zero. Inspect full_original_window and reference provenance; partial observations must not silently acquire full-horizon scope.

Required axis-specific example specifications:

- **positive — proposed, not executed as written:** Samples [0,0],[1,2],[2,4]. Expected: Centered matrix has rank 1 at the stated roundoff threshold.
- **counterexample — proposed, not executed as written:** Samples [1,0],[0,1],[-1,0],[0,-1] on the unit circle. Expected: Centered matrix rank=2 despite a one-dimensional nonlinear manifold.
- **degenerate — proposed, not executed as written:** Constant samples or a single stored point. Expected: Centered singular values all zero and sample rank=0; underlying state dimension does not become zero.

These examples are proposed, not run by this document. Produce actual isolated-run artifacts with the input, expected assertion, observed value/status, tolerances, code hash and complete output. Related existing test references are in descriptor.json and must not be relabeled as execution of a different example.

For a new or changed evaluator, prepare an `evaluator_proposal_v1` submission conforming to `../../evaluator-proposal-contract.json`: mathematical definition, supported scopes/evidence, units, versioned projections, dependencies/execution contract, primary sources or explicit derivation artifacts, and these positive/counterexample/degenerate cases. State what is unproved. Never execute submitted untrusted source on the host; use the reviewed isolated runner.

## Independent Astra reviewer

A **different authenticated gpt-6-astra reviewer** must inspect the actual implementation and source hashes, independently derive the formulas and all expected examples, check scaling and scope, verify null cases and each projection's version/evidence acceptance, and inspect real test artifacts. For z20, explicitly challenge this failure mode: Samples [1,0],[0,1],[-1,0],[0,-1] on the unit circle. The required distinction is: Centered matrix rank=2 despite a one-dimensional nonlinear manifold.

Also inspect the degenerate boundary: Constant samples or a single stored point. Expected handling: Centered singular values all zero and sample rank=0; underlying state dimension does not become zero. Do not accept a sampled or declared property as a theorem. Record accepted/rejected/unresolved findings and limitations, exact proposal and implementation SHA256, reviewer identity, model provenance and review artifact hash. A copied approval flag or self-declared model name is insufficient. The author cannot approve their own mathematics.

Return missing evidence when any obligation is absent. `ready_for_governed_execution` is workflow readiness only; this prompt and its examples do not certify mathematical truth or authorize automatic deployment. Do not replace numerical measurement fields with certified domain bounds; preserve the separately bound claim route where implemented.
