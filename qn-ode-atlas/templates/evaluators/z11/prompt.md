# z11: Gradient and standard symplectic compatibility — mathematical author and independent review prompt

Use the adjacent `descriptor.json` as the frozen implementation contract. Verify its source hashes before changing this axis. The actual registry descriptor, engine result version and projection versions are distinct fields; do not silently equate them.

## Astra mathematical author

An authenticated **gpt-6-astra** author must state the precise claim and implement only the authorized scope. **gpt-6.1-sol may perform engineering only** (packaging, UI, wiring, documentation mechanics); it must not substitute for mathematical authorship or approval. Naming a model in text is not evidence of its actual use.

For this axis the current computation is:

Return max ||J-J^T||F in scaled coordinates. For even n and canonical ordering all q then all p, recover physical A=D J D^-1/Ts and return max ||A^T Omega+Omega A||F, Omega=[[0,I],[-I,0]].

Operational scope: **point or trajectory**. Units/convention: curl residual in inverse scaled time; symplectic residual in inverse physical time under canonical coordinate convention. Work with y=D^-1 x, tau=t/Ts, g=Ts D^-1 f(t,Dy), J=Ts D^-1 A D unless the formula explicitly returns physical coordinates. Use L2, with Frobenius only where specified.

The critical mathematical boundary is: **Only local sampled necessary compatibility is checked; noncanonical Poisson structures and global topology are not tested.**

Explain why each dependency in descriptor.json is necessary. Preserve separate declared, numerical, analytic and independently certified evidence. No bound-certificate adapter is implemented for this axis. Do not invent a certificate route. Preserve null/failure semantics; a zero value must represent an actual measured/derived zero. Inspect full_original_window and reference provenance; partial observations must not silently acquire full-horizon scope.

Required axis-specific example specifications:

- **positive — proposed, not executed as written:** Two-dimensional rotation A=[[0,1],[-1,0]], unit scales. Expected: standard symplectic residual=0; gradient curl residual=2*sqrt(2).
- **counterexample — proposed, not executed as written:** A=-I in dimension 2. Expected: gradient curl residual=0 but symplectic residual=2*sqrt(2): gradient compatibility is not Hamiltonian compatibility.
- **degenerate — proposed, not executed as written:** Odd state dimension 3. Expected: physical_standard_symplectic_residual_max=null; do not invent a standard symplectic form.

These examples are proposed, not run by this document. Produce actual isolated-run artifacts with the input, expected assertion, observed value/status, tolerances, code hash and complete output. Related existing test references are in descriptor.json and must not be relabeled as execution of a different example.

For a new or changed evaluator, prepare an `evaluator_proposal_v1` submission conforming to `../../evaluator-proposal-contract.json`: mathematical definition, supported scopes/evidence, units, versioned projections, dependencies/execution contract, primary sources or explicit derivation artifacts, and these positive/counterexample/degenerate cases. State what is unproved. Never execute submitted untrusted source on the host; use the reviewed isolated runner.

## Independent Astra reviewer

A **different authenticated gpt-6-astra reviewer** must inspect the actual implementation and source hashes, independently derive the formulas and all expected examples, check scaling and scope, verify null cases and each projection's version/evidence acceptance, and inspect real test artifacts. For z11, explicitly challenge this failure mode: A=-I in dimension 2. The required distinction is: gradient curl residual=0 but symplectic residual=2*sqrt(2): gradient compatibility is not Hamiltonian compatibility.

Also inspect the degenerate boundary: Odd state dimension 3. Expected handling: physical_standard_symplectic_residual_max=null; do not invent a standard symplectic form. Do not accept a sampled or declared property as a theorem. Record accepted/rejected/unresolved findings and limitations, exact proposal and implementation SHA256, reviewer identity, model provenance and review artifact hash. A copied approval flag or self-declared model name is insufficient. The author cannot approve their own mathematics.

Return missing evidence when any obligation is absent. `ready_for_governed_execution` is workflow readiness only; this prompt and its examples do not certify mathematical truth or authorize automatic deployment. Do not replace numerical measurement fields with certified domain bounds; preserve the separately bound claim route where implemented.
