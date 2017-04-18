import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchStreams, showWorkflowDialog, createProject, storeProjectName, storeProjectAmount, storeProjectPurpose} from './actions';
import Overview from './Overview';

class OverviewContainer extends Component {
  componentWillMount() {
    this.props.fetchStreams();
  }

  render() {
    return <Overview {...this.props} />
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStreams: () => dispatch(fetchStreams()),
    createProject: (name, parent, amount,purpose) => dispatch(createProject(name, parent, amount,purpose)),
    showWorkflowDialog: () => dispatch(showWorkflowDialog(true)),
    hideWorkflowDialog: () => dispatch(showWorkflowDialog(false)),
    storeProjectName: (name) => dispatch(storeProjectName(name)),
    storeProjectAmount: (amount) => dispatch(storeProjectAmount(amount)),
    storeProjectPurpose: (purpose) => dispatch(storeProjectPurpose(purpose))
  };
}

const mapStateToProps = (state) => {
  return {
    streams: state.getIn(['overview', 'streams']),
    workflowDialogVisible: state.getIn(['overview', 'workflowDialogVisible']),
    projectName: state.getIn(['overview', 'projectName']),
    projectAmount: state.getIn(['overview', 'projectAmount']),
    projectPurpose: state.getIn(['overview', 'projectPurpose'])

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewContainer);
