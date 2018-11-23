import React from 'react'
import { Header } from 'semantic-ui-react'

const Detail = (props) => (
    <div>
        <Header as='h3' content={props.content} textAlign='left' />
        {props.title}
    </div>
);

export default Detail

//usb
//