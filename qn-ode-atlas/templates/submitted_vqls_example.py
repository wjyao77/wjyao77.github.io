"""Four-function reviewed-source example; no reference or classical solve.

Requires the pinned qn_atlas finite-lift implementation in the approved image.
The algorithm asks the trusted runner for 48 exact cost evaluations and two
final circuit executions. Finite differences here are not a parameter-shift
identity for controlled rotations.
"""
import numpy as np
from qiskit.quantum_info import SparsePauliOp
from qn_atlas.quantum.contracts import scenario_problem
from qn_atlas.quantum.finite_lift_vqls import (supports as _supports,prepare as _prepare,
                                             ansatz,_initial_angles,ENCODING)


def supports(problem,task):
    return _supports(scenario_problem(problem,problem.get('scenario')),task)


def prepare(problem,task,config):
    pre=_prepare(scenario_problem(problem,problem.get('scenario')),task)
    return {'theta':_initial_angles(pre['normalized_rhs'])+np.random.default_rng(1729).normal(0,.01,3),
            'operator':SparsePauliOp.from_operator(pre['hamiltonian']),
            'swap':pre['transformation']['restore_swap_first_two_amplitudes'],
            'round':0,'processed':0,'final_requested':False,
            'shots':int(config.get('final_shots',8192))}


def build(prepared,feedback):
    if prepared['final_requested']:return None
    new=feedback[prepared['processed']:]
    if new:
        if len(new)!=6 or any(r['kind']!='expectation' for r in new):
            raise ValueError('expected six trusted cost evaluations')
        # Controlled-RY generators do not obey the simple two-term Pauli shift.
        gradient=np.array([(new[2*j]['value']-new[2*j+1]['value'])/(2e-4) for j in range(3)])
        prepared['theta']-=2.0*gradient
        prepared['round']+=1
        prepared['processed']=len(feedback)
    if prepared['round']>=8:
        qc=ansatz(prepared['theta'])
        if prepared['swap']:
            qc.x(1);qc.cx(1,0);qc.x(1)
        prepared['final_requested']=True
        return {'circuits':[{'kind':'statevector','circuit':qc},
                            {'kind':'sampler','circuit':qc,'shots':prepared['shots']}]}
    circuits=[]
    for j in range(3):
        for sign in (1,-1):
            theta=prepared['theta'].copy();theta[j]+=sign*1e-4
            circuits.append({'kind':'estimator','circuit':ansatz(theta),'observable':prepared['operator']})
    return {'circuits':circuits}


def decode(results,prepared):
    return [{'artifact_id':r['artifact_id'],'encoding':dict(ENCODING)}
            for r in results if r['kind'] in ('statevector','samples')]
