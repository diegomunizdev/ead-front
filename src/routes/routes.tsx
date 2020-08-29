import React, { Suspense } from 'react'
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import authService from '../services/auth'

import Spinner from '../components/spinner/spinner'
import Main from '../components/main/main'
import NotFound from '../components/notFound/not-found'
import Layout from '../containers/layout/layout'
import Auth from '../containers/auth/login'
import Profile from '../containers/users/profile'

interface PrivateRouteProps extends RouteProps {
    key?: number
    component?: any
    private?: boolean
    redirect?: string
    path?: string
    routes?: any
    properties?: any[]
}

export const MenuRoutes = (route: PrivateRouteProps) => {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={(props: RouteProps) => {
                /* Verify user is authenticated */
                if (route.private && !authService.isAuthenticated()) {
                    return (
                        <Redirect
                            to={{ pathname: '/ead/auth/signin', state: { from: props.location } }}
                        />
                    )
                }
                if (route.redirect) {
                    return (
                        <Redirect
                            to={{
                                pathname: `${route.redirect}`,
                                state: { from: props.location }
                            }}
                        />
                    )
                }
                return (
                    <route.component
                        {...props}
                        {...route.properties}
                        exact={true}
                        routes={route.routes}
                    />
                )
            }}
        />
    )
}

const routes = [
    { path: '/', exact: true, redirect: '/ead' },
    { path: '/ead/auth/signin', exact: true, component: Auth },
    {
        path: '/ead',
        strict: true,
        private: true,
        component: Layout,
        routes: [
            {
                path: '/ead/main',
                exact: true,
                private: true,
                component: Main
            },
            {
                path: '/ead/user/:userId/profile',
                exact: true,
                private: true,
                component: Profile
            }
        ]
    },
    {
        path: '/not_found',
        component: NotFound,
        exact: true
    },
    {
        path: '*',
        component: NotFound
    }

]

class Routes extends React.Component<{ history: any }> {
    public render() {
        return (
            <ConnectedRouter history={this.props.history}>
                <Suspense fallback={<Spinner />}>
                    <Switch>
                        {routes.map((route, i) => (
                            <MenuRoutes key={i} {...route} />
                        ))}
                    </Switch>
                </Suspense>
            </ConnectedRouter>
        )
    }
}

export default Routes