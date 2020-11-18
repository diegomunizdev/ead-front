import React, { Suspense } from 'react'
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import authService from '../services/auth.service'

import { VerifyUserType } from '../store/application/utils/verifyUserType'

import Spinner from '../components/spinner/spinner'
import Main from '../components/pages/main'
import NotFound from '../components/notFound/notfound'
import AccessDanied from '../components/notFound/accessdenied'
import Layout from '../containers/layout/layout'
import Auth from '../containers/auth/login'
import Profile from '../containers/users/profile'
import Instructions from '../components/pages/instructions'
import Games from '../components/pages/game'

import UserPage from '../components/pages/user.page'
import SubjectPage from '../components/pages/subjects.page'

import ListAdmins from '../containers/users/list.admin'
import ListStudent from '../containers/users/list.student'
import ListTeacher from '../containers/users/list.teacher'
import ListTutor from '../containers/users/list.tutor'
import ListGame from '../containers/game/list.game'

import ListSubjects from '../containers/subject/list.subject'
import CreateSubject from '../containers/subject/list.classes'
import ListClasses from '../containers/subject/classes'
import CreateClasses from '../containers/subject/create.classes'

import ListExercise from '../containers/exercise/list.exercise'
import CreateExercise from '../containers/exercise/create.exercise'

interface PrivateRouteProps extends RouteProps {
    key?: number
    component?: any
    private?: boolean
    redirect?: string
    path?: string
    routes?: any
    userType?: string[]
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

                if (route.userType) {
                    if (!VerifyUserType.verifyType(route.userType)) {
                        return (
                            <Redirect
                                to={{
                                    pathname: '/accessdenied',
                                    state: { from: props.location }
                                }}
                            />
                        )
                    }
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
    { path: '/', exact: true, redirect: '/ead/auth/signin' },
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
                userType: ['admin', 'student', 'tutor', 'teacher'],
                private: true,
                component: Main
            },
            {
                path: '/ead/user/management',
                exact: true,
                userType: ['admin'],
                private: true,
                component: UserPage
            },
            {
                path: '/ead/user/:userId/profile',
                exact: true,
                userType: ['admin', 'student', 'tutor', 'teacher'],
                private: true,
                component: Profile
            },
            {
                path: '/ead/user/type/admin',
                exact: true,
                userType: ['admin'],
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
                path: '/ead/user/:userId/game/period/:period',
                exact: true,
                private: true,
                component: ListGame
            },
            {
                path: '/ead/user/:userId/game/period/:period/question',
                exact: true,
                private: true,
                component: Games
            },
            {
                path: '/ead/subjects',
                exact: true,
                private: true,
                component: SubjectPage
            },
            {
                path: '/ead/subjects/:teacherId',
                exact: true,
                private: true,
                component: ListSubjects
            },
            {
                path: '/ead/subjects/:subjectId/new',
                exact: true,
                private: true,
                component: CreateSubject
            },
            {
                path: '/ead/classes/:teacherId',
                exact: true,
                private: true,
                component: ListClasses
            },
            {
                path: '/ead/classes/:subjectId/subject',
                exact: true,
                private: true,
                component: CreateSubject
            },
            {
                path: '/ead/subject/:subjectId/classes/new',
                exact: true,
                private: true,
                component: CreateClasses
            },
            {
                path: '/ead/subjects/:subjectId/exercise',
                exact: true,
                private: true,
                component: ListExercise
            },
            {
                path: '/ead/subject/:subjectId/exercise/new',
                exact: true,
                private: true,
                component: CreateExercise
            },

        ]
    },
    {
        path: '/not_found',
        component: NotFound,
        exact: true
    },
    {
        path: '/accessdenied',
        component: AccessDanied,
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