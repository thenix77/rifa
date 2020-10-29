const Route = ReactRouterDOM.Route
const Redirect = ReactRouterDOM.Redirect
const Component = React.Component





 const RouteProtected = ({
                component:Component,
                ...rest
        }) => {
    return (
        
                    <Route {...rest} render={
                                                (props) =>  
                                                    isAuthorization()?
                                                        <Component {...props} />
                                                    :
                                                        <Redirect to={{
                                                            pathname:'/wasiyux',
                                                            state:{
                                                                from:props.location
                                                            }                                       
                                                        }}
                                                        />
                                            }
                    />
                )
}
