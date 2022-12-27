import React, { Component } from "react";
import $ from 'jquery';
import 'datatables.net-bs4/js/dataTables.bootstrap4'
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css'

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tb: {}
        }
    }

    componentDidMount() {
        if(!this.props.data.length)
            return;
        var config = {}
        config['data'] = this.props.data;
        config['columns'] = this.props.columns;
        config["paging"] = (this.props.paging ? true : false);
        config["searching"] = (this.props.searching ? true : false);
        config["ordering"] = (this.props.ordering ? true : false);
        config["select"] = (this.props.select ? true : false);

        // config["responsive"] = true;

        var tb = $("table").DataTable(config);

        $('table').on('click', 'tr', function () {
            $(this).toggleClass('selected');
        });
         
       
        this.setState({
            tb: tb
        })

        this.props.setTable(tb);
    }
    
    componentWillUnmount() {
        if(!this.state.tb)
            this.state.tb.destroy()
    }
    render() {
        return (
            <>
                <table 
                    className={this.props.className ? this.props.className : ''} 
                    id={this.props.id ? this.props.id : ''} 
                    width="100%"
                >  
                </table>
            </>
        )
    }
}

export default Table;