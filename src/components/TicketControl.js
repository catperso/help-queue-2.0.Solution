import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      allowedToSubmit: 0,
      mainTicketList: []
    };
  }

  handleClick = () => {
    this.setState(prevState => ({
      formVisibleOnPage: !prevState.formVisibleOnPage,
      allowedToSubmit: 0
    }));
  }

  advanceText = () => {
    this.setState(prevState => ({
      allowedToSubmit: prevState.allowedToSubmit += 1
    }));
  }

  handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = this.state.mainTicketList.concat(newTicket);
    this.setState({mainTicketList: newMainTicketList, formVisibleOnPage: false});
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    let addAdvanceButton = null;
    if (this.state.formVisibleOnPage) {
      if (this.state.allowedToSubmit === 0) {
        currentlyVisibleState = <p>"Have you gone through all the steps on the Learn How to Program debugging lesson?"</p>;
      } else if (this.state.allowedToSubmit === 1) {
        currentlyVisibleState = <p>"Have you asked another pair for help?"</p>;
      } else if (this.state.allowedToSubmit === 2) {
        currentlyVisibleState = <p>"Have you spent 15 minutes going through through the problem documenting every step?"</p>;
      } else if (this.state.allowedToSubmit >= 3) {
        currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;
      }
      if (this.state.allowedToSubmit < 3) {
        addAdvanceButton = <button onClick={this.advanceText} class="btn btn-warning">Yes I did!</button>;
      }
      buttonText = "Return to ticket list";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.state.mainTicketList}/>;
      buttonText = "Add ticket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        {addAdvanceButton}
        <button onClick={this.handleClick} class="btn btn-info">{buttonText}</button>
      </React.Fragment>
    );
  }
}

export default TicketControl;