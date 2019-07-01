import React from 'react'
import { Form, Button, Container } from 'semantic-ui-react'
import {connect} from 'react-redux'

class LoginPage extends React.Component {
	state = {
		username: "",
		password: "",
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = () => {
		fetch("http://localhost:3000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then(response => {
			if (response.errors){
        console.log('no good')
				alert(response.errors)
			} else {
        console.log(response)
        localStorage.setItem("token", response.token)
				this.props.setUser(response.user)
  			this.props.history.push(`/`)
			}
		})
	}

	render(){
		return (
			<Container style={{background:"black", marginTop:"12%", width:"30%"}}>
			<h2 style={{textAlign:"center", paddingTop:"20px"}}>Login</h2>
			<Form onSubmit={this.handleSubmit}>
		    <Form.Field style={{margin:" 10px 50px"}}>
		      <label style={{color:"white"}}>Username</label>
		      <input onChange={this.handleChange} name="username" value={this.state.username} placeholder='Username' />
		    </Form.Field>
		    <Form.Field style={{margin:" 10px 50px"}}>
		      <label style={{color:"white"}}>Password</label>
		      <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder='Password' />
		    </Form.Field>
		    <div style={{textAlign:"center", paddingBottom: "10px"}}><Button type='submit'>Submit</Button></div>
		  </Form>
			</Container>
		)
	}
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => {
      dispatch({
        type: "SET_USER",
        payload: user
      })
    }}
}

export default connect(null, mapDispatchToProps)(LoginPage)
