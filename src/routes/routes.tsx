import React, { Suspense } from 'react'
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import authService from '../services/auth'

import Spinner from '../components/spinner/spinner'
import Main from '../components/pages/main'
import NotFound from '../components/notFound/not-found'
import Layout from '../containers/layout/layout'
import Auth from '../containers/auth/login'
import Profile from '../containers/users/profile'
import Instructions from '../components/pages/instructions'
import Games from '../components/pages/game'

import UserPage from '../components/pages/user.page'
import ListAdmins from '../containers/users/list.admin'
import ListStudent from '../containers/users/list.student'
import ListTeacher from '../containers/users/list.teacher'
import ListTutor from '../containers/users/list.tutor'
import ListGame from '../containers/game/list.game'

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
                path: '/ead/user/management',
                exact: true,
                private: true,
                component: UserPage
            },
            {
                path: '/ead/user/:userId/profile',
                exact: true,
                private: true,
                component: Profile
            },
            {
                path: '/ead/user/type/admin',
                exact: true,
                private: true,
                component: ListAdmins
            },
            {
                path: '/ead/user/type/student',
                exact: true,
                private: true,
                component: ListStudent
            },
            {
                path: '/ead/user/type/tutor',
                exact: true,
                private: true,
                component: ListTutor
            },
            {
                path: '/ead/user/type/teacher',
                exact: true,
                private: true,
                component: ListTeacher
            },
            {
                path: '/ead/game/instructions',
                exact: true,
                private: true,
                component: Instructions
            },
            {
                path: '/ead/game/period',
                exact: true,
                private: true,
                component: Games
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