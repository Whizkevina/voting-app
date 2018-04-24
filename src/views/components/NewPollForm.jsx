import React, { Component, } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import {
  Alert,
  FormCard,
  FormInput,
  FormRow,
  FormSubmitButton,
  Icon,
  IconLink,
  PollChoice,
} from '../layout'

const StyledNewChoiceIcon = styled(Icon)`
  position: absolute;
  line-height: 4.2rem;
  cursor: pointer;

  &:hover {
    color: #11a799 !important;
  }
`

const PollChoices = ({
  choices,
  selectedChoice,
  ...props
}) => {

  const handleChoiceDelete = (e, i) => {
    e.preventDefault()
    props.handleChoiceDelete(i)
  }

  return choices.map((choice, i) => (
    <FormRow key={ `choice_${i}` }>
      <PollChoice
        action={ handleChoiceDelete }
        actionIcon="close"
        choice={ choice }
        handleSelectedChoice={ props.handleSelectedChoice }
        index={ i }
        label={ `Choice ${i + 1}` }
        name={ `choice_${i}` }
        onChange={ props.handleInputChange }
        selectedChoice={ selectedChoice }
        { ...props }
      />
    </FormRow>
  ))
}

const inputLengths = {
  title: { min: 4, max: 64, },
  shortName: { min: 0, max: 16, },
  choices: { min: 2, max: undefined, },
  choice: { min: 1, max: 32, },
}

class NewPollForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      newChoice: this.props.newChoice,
    }
  }

  render() {

    const {
      choices,
      error,
      handleChoiceAdd,
      handleChoiceDelete,
      handleInputChange,
      handleInputBlur,
      handleInputFocus,
      handleSelectedChoice,
      handleSubmit,
      newChoice,
      selectedChoice,
      shortName,
      title,
    } = this.props

    const layout = {
      title: "Create New Poll",
      error: error,
    }

    const alert = (
      <FormRow>
        <Alert
          className="col s8 offset-s2"
          show={error ? true : false}
          type={error ? 'warning' : 'success' }
        >
          <strong>Warning!&nbsp;&nbsp;</strong>{error}
        </Alert>
      </FormRow>
    )

    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m10 offset-m1 xl8 offset-xl2">
            <FormCard {...layout} alert={ alert }>
              <form 
                id="new_poll_form"
                onSubmit={ handleSubmit }
              >

                <FormRow>
                  <FormInput
                    icon=""
                    label="Title (e.g. Favorite Superhero)"
                    maxLength={inputLengths.title.max}
                    name="title"
                    onChange={ handleInputChange }
                    required
                    size="s12 m12 l8 offset-l2"
                    value={ title }
                  />
                </FormRow>

                <FormRow>
                  <FormInput
                    icon=""
                    label="Short Title (e.g. fav_superhero) (optional)"
                    maxLength={inputLengths.shortName.max}
                    name="shortName"
                    onChange={ handleInputChange }
                    size="s12 m12 l8 offset-l2"
                    value={ shortName }
                  />
                </FormRow>

                {/* Iterate and display existing poll choices */}
                <PollChoices
                  choices={choices}
                  handleChoiceDelete={ handleChoiceDelete }
                  handleInputChange={ handleInputChange}
                  handleSelectedChoice={ handleSelectedChoice }
                  icon=""
                  maxLength={inputLengths.choice.max}
                  selectedChoice={selectedChoice}
                />

                {/* Allow user to enter new poll choice */}
                <FormRow>
                  <PollChoice
                    choice={ newChoice }
                    label="New Choice"
                    maxLength={inputLengths.choice.max }
                    name="newChoice"
                    onChange={ handleInputChange }
                    onFocus={ handleInputFocus }
                    onBlur={ handleInputBlur }
                    size="s7 offset-s2"
                  />
                  <div className={"col s3"}>
                    <IconLink
                      href="#AddNewChoice"
                      title="Click"
                      onClick={ handleChoiceAdd }
                      Icon={
                        <StyledNewChoiceIcon
                          className="material-icons"
                          fontSize="48px"
                          color="teal-text text-darken-1"
                        >
                          {"add_circle_outline"}
                        </StyledNewChoiceIcon>
                      }
                    >
                    </IconLink>
                  </div>
                </FormRow>

                {/* Submit poll */}
                <FormRow>
                  <FormSubmitButton
                    onClick={ handleSubmit }
                    position="right"
                    size="s6 offset-s3"
                  />
                </FormRow>

              </form>

            </FormCard>
          </div>
        </div>
      </div>
    )
  }
}

NewPollForm.propTypes = {
  choices: PropTypes.array,
  error: PropTypes.array,
  handleChoiceAdd: PropTypes.func,
  handleChoiceDelete: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleInputBlur: PropTypes.func,
  handleInputFocus: PropTypes.func,
  handleSelectedChoice: PropTypes.func,
  handleSubmit: PropTypes.func,
  newChoice: PropTypes.string,
  selectedChoice: PropTypes.string,
  shortName: PropTypes.string,
  title: PropTypes.string,
}

NewPollForm.defaultProps = {
  choices: [],
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  newChoice: '',
  selectedChoice: '',
  shortName: '',
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
}

export default NewPollForm