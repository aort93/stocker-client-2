import React from 'react'
import { Form, Button, Container} from 'semantic-ui-react'
import {connect} from 'react-redux'


class SignUpPage extends React.Component {
  state = {
    first_name: "",
    last_name: "",
		username: "",
    cash:"",
		password: "",
		passwordConfirmation: "",
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

  createUser = () => {
		fetch("http://localhost:3000/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json",
			},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then((response) => {
			if (response.errors){
				alert(response.errors)
			} else {
        console.log(response.user)
			  this.props.setUser(response.user)
        localStorage.setItem("token", response.token)
  			this.props.history.push(`/`)
			}
		})
	}

	handleSubmit = () => {
		if(this.state.password === this.state.passwordConfirmation && this.state.cash > 200){
			this.createUser()
		} else {
			alert("Passwords don't match! or not enough money(less than 200)")
		}
	}

  render(){
    console.log(this.state)
		return (
      <Container style={{background:"black", marginTop:"12%", width:"30%"}}>
      <h2 style={{textAlign:"center", paddingTop:"20px"}}>Sign Up</h2>
			<Form onSubmit={this.handleSubmit}>
      <Form.Field style={{margin:" 10px 50px"}}>
        <label style={{color:"white"}}>First Name</label>
        <input onChange={this.handleChange} name="first_name" value={this.state.first_name} placeholder='first name' />
      </Form.Field>
      <Form.Field style={{margin:" 10px 50px"}}>
        <label style={{color:"white"}}>Last Name</label>
        <input onChange={this.handleChange} name="last_name" value={this.state.last_name} placeholder='last name' />
      </Form.Field>
		    <Form.Field style={{margin:" 10px 50px"}}>
		      <label style={{color:"white"}}>Username</label>
		      <input onChange={this.handleChange} name="username" value={this.state.username} placeholder='Username' />
		    </Form.Field>
        <Form.Field style={{margin:" 10px 50px"}}>
		      <label style={{color:"white"}}>Amount to Start Trading With:</label>
		      <input onChange={this.handleChange} name="cash" type="number" value={this.state.cash} placeholder='$Cash' />
		    </Form.Field>
		    <Form.Field style={{margin:" 10px 50px"}}>
		      <label style={{color:"white"}}>Password</label>
		      <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder='Password' />
		    </Form.Field>
		    <Form.Field style={{margin:" 10px 50px"}}>
		      <label style={{color:"white"}}>Password Confirmation</label>
		      <input onChange={this.handleChange} type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} placeholder='Password Confirmation' />
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

export default connect(null, mapDispatchToProps)(SignUpPage)
