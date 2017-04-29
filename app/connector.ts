import { AppState, Dispatch } from './interfaces';
import {connect} from 'react-redux';
import { BattleState, CalculationResult } from '../engine/src/interfaces';
import { actions } from './actions';

//https://www.silviogutierrez.com/blog/react-redux-and-typescript-typed-connect/

// We use generic inference.
export function typedConnect<OwnProps, StateProps, DispatchProps>(
    // And "capture" the return of mapStateToProps
    mapStateToProps: (state: AppState, ownProps: OwnProps) => StateProps,
    // As well as the return of mapDispatchToProps.
    // Or in case you use the shorthand literal syntax, capture it as is.
    mapDispatchToProps?: DispatchProps | ((dispatch: Dispatch, ownProps: OwnProps) => DispatchProps),
) {
    // We combine all generics into the inline component we'll declare.
    return function componentImplementation(component: React.StatelessComponent<OwnProps & StateProps & DispatchProps>) {
        // Finally, we double assert the real connect to let us do anything we want.
        // And export a component that only takes OwnProps.
        return connect(mapStateToProps, mapDispatchToProps as any)(component) as any as React.StatelessComponent<OwnProps>;
    }
}

interface stateProps {
    battle:BattleState,
    calculation: CalculationResult[]
}

interface actions {
    reply: Function,
    showCalculation: Function,
    backCalculation: Function
}

export function withBattle<T>(component: React.StatelessComponent<T & stateProps & actions>){
    return typedConnect<T,stateProps,any>(
        appState => ({battle: appState.battle, calculation: appState.calculation}),
        dispatch => ({
            reply: (opt)=> dispatch(actions.reply(opt)),
            showCalculation: (calc,dig)=> dispatch(actions.showCalculation(calc,dig)),
            backCalculation: ()=> dispatch(actions.backCalculation())
        })
    )(component);
}