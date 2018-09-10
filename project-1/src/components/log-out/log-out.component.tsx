import * as React from 'react';

export class LogOutComponent extends React.Component<any> {

    constructor(props: any) {
        super(props);
        localStorage.clear()
    }

    public render() {
        return (

            < div > Logged Out!</div >
        )
    }
}