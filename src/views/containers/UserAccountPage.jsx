import React, { Component } from 'react'
import path from 'path'
import { Link } from 'react-router-dom'

import { UserAccountForm } from '../components'

class UserAccountPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: "",
      loaded: false,
      polls: []
    }
    this._isMounted = false
    this.deletePoll = this.deletePoll.bind(this)
    this.deleteAccount = this.deleteAccount.bind(this)
  }


  updateTabs() {
    $(document).ready(() => { $('ul.tabs').tabs() })
  }


  deletePoll({ id, title }) {
    console.log(id, title)
    const confirmDelete = confirm(
      `Are you sure you want to delete the poll ${title}?`
    )

    if (!confirmDelete) return

    fetch(`/api/poll/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "default",
      credentials: "same-origin",
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(({ success, message, poll }) => {
        if (!success) {
          return this.setState({ error: message })
        }
        this.getPolls()
        console.log(`Poll "${title}" deleted.`)
      })
  }

  deleteAccount() {
    const confirmDelete = confirm(
      `Are you sure you want to delete your account?`
    )

    if (!confirmDelete) return

    const { user } = this.props

    fetch(`/api/user/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "default",
      credentials: "same-origin",
      body: JSON.stringify({ user })
    })
      .then(res => res.json())
      .then(({ success, message, user }) => {
        if (!success) {
          return this.setState({ error: message })
        }
        console.log(message)
        this.props.updateAuthStatus()
      })
  }

  getPolls() {
    fetch(`/api/${this.props.user}/polls`, {
      method: "GET",
      cache: "default",
      credentials: "same-origin"
    })
      .then(res => res.json()).then(({success, polls, message}) => {

        if (!this._isMounted) return
        if (!success) {
          return this.setState({ error: message})
        }

        this.setState({ polls, loaded: true })
      })
      .catch(console.error)
  }

  componentDidMount() {
    this._isMounted = true
    this.updateTabs()
    this.getPolls()
  }

  componentDidUpdate() {
    this.updateTabs()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {

    const { loaded, polls, error } = this.state
    const { location, user } = this.props

    const title = "My Account"
    const footer = (
      <span className="footer-text">
        <Link to={path.join(location.pathname, `polls`)}>
          {"View all of your polls!"}
        </Link>
      </span>
    )

    return (
      <UserAccountForm
        deletePoll={ this.deletePoll }
        deleteAccount={ this.deleteAccount }
        error={ error }
        footer={
          <span className="footer-text">
            <Link to={path.join(location.pathname, `polls`)}>
              {"View all of your polls!"}
            </Link>
          </span>
        }
        loaded={ loaded }
        location={ location }
        polls={ polls }
        title={ title }
        updateTabs={ this.updateTabs }
        user={ user }
      />
    )
  }

}

export default UserAccountPage