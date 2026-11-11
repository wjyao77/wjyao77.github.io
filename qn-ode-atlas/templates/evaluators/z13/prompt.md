# z13: Local spectral rate separation — mathematical author and independent review prompt

Use the adjacent `descriptor.json` as the frozen implementation contract. Verify its source hashes before changing this axis. The actual registry descriptor, engine result version and projection versions are distinct fields; do not silently equate them.

## Astra mathematical author

An authenticated **gpt-6-astra** author must state the precise claim and implement only the authorized scope. **gpt-6.1-sol may perform engineering only** (packaging, UI, wiring, documentation mechanics); it must not substitute for mathematical authorship or approval. Naming a model in text is not evidence of its actual use.

For this axis the current computation is:

For each sampled J obtain eigenvalues lambda. Keep |Re lambda|>1e-10*max(1,max|lambda|); ratio=max/min of retained absolute real rates |Re(lambda)|, else null. Also return sampled spectral abscissa min/max and max |Im lambda|.

Operational scope: **point or trajectory**. Units/convention: rate ratios dimensionless; spectral rates inverse scaled time. Work with y=D^-1 x, tau=t/Ts, g=Ts D^-1 f(t,Dy), J=Ts D^-1 A D unless the formula explicitly returns physical coordinates. Use L2, with Frobenius only where specified.

The critical mathematical boundary is: **Real-rate ratio is a stiffness proxy. Imaginary modes and solver stability/accuracy restrictions require separate interpretation.**

Explain why each dependency in descriptor.json is necessary. Preserve separate declared, numerical, analytic and independently certified evidence. No bound-certificate adapter is implemented for this axis. Do not invent a certificate route. Preserve null/failure semantics; a zero value must represent an actual measured/derived zero. Inspect full_original_window and reference provenance; partial observations must not silently acquire full-horizon scope.

Required axis-specific example specifications:

- **positive — proposed, not executed as written:** J=diag(-1,-100). Expected: real_rate_ratios=[100] in point mode; spectral abscissa=-1; imaginary rate=0.
- **counterexample — proposed, not executed as written:** Pure rotation eigenvalues +/-i. Expected: real-rate ratio=null, imaginary_rate_max=1; null does not mean no time-step restriction.
- **degenerate — proposed, not executed as written:** J=0. Expected: real-rate ratio=null; abscissa and imaginary rate are 0; never divide 0 by 0.

These examples are proposed, not run by this document. Produce actual isolated-run artifacts with the input, expected assertion, observed value/status, tolerances, code hash and complete output. Related existing test references are in descriptor.json and must not be relabeled as execution of a different example.

For a new or changed evaluator, prepare an `evaluator_proposal_v1` submission conforming to `../../evaluator-proposal-contract.json`: mathematical definition, supported scopes/evidence, units, versioned projections, dependencies/execution contract, primary sources or explicit derivation artifacts, and these positive/counterexample/degenerate cases. State what is unproved. Never execute submitted untrusted source on the host; use the reviewed isolated runner.

## Independent Astra reviewer

A **different authenticated gpt-6-astra reviewer** must inspect the actual implementation and source hashes, independently derive the formulas and all expected examples, check scaling and scope, verify null cases and each projection's version/evidence acceptance, and inspect real test artifacts. For z13, explicitly challenge this failure mode: Pure rotation eigenvalues +/-i. The required distinction is: real-rate ratio=null, imaginary_rate_max=1; null does not mean no time-step restriction.

Also inspect the degenerate boundary: J=0. Expected handling: real-rate ratio=null; abscissa and imaginary rate are 0; never divide 0 by 0. Do not accept a sampled or declared property as a theorem. Record accepted/rejected/unresolved findings and limitations, exact proposal and implementation SHA256, reviewer identity, model provenance and review artifact hash. A copied approval flag or self-declared model name is insufficient. The author cannot approve their own mathematics.

Return missing evidence when any obligation is absent. `ready_for_governed_execution` is workflow readiness only; this prompt and its examples do not certify mathematical truth or authorize automatic deployment. Do not replace numerical measurement fields with certified domain bounds; preserve the separately bound claim route where implemented.
