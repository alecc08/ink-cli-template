import { useState } from 'react';
import { Box } from 'ink';
import Splash from './components/Splash.js';
import LoginServer from './components/LoginServer.js';
import Dashboard from './components/Dashboard.js';
import EntityForm from './components/EntityForm.js';
import RequestList from './components/RequestList.js';
import EntitySelector from './components/EntitySelector.js';

export type View = 'SPLASH' | 'LOGIN_FLOW' | 'DASHBOARD' | 'MANAGE_TEAM_ADD' | 'MANAGE_TEAM_MODIFY_SELECT' | 'MANAGE_TEAM_MODIFY_FORM' | 'MANAGE_REPO_ADD' | 'MANAGE_REPO_MODIFY_SELECT' | 'MANAGE_REPO_MODIFY_FORM' | 'VIEW_REQUESTS';

export type Team = {
    id: string;
    name: string;
    description: string;
    lead: string;
};

export type Repository = {
    id: string;
    name: string;
    language: string[];
    visibility: 'Public' | 'Private';
};

export type Request = {
    id: string;
    type: 'TEAM' | 'REPO';
    action: 'ADD' | 'MODIFY';
    data: any;
    status: 'PENDING';
};

// Dummy Data
const INITIAL_TEAMS: Team[] = [
    { id: 't1', name: 'Core Platform', description: 'Backend infrastructure', lead: 'Sarah' },
    { id: 't2', name: 'Frontend Ops', description: 'UI/UX libraries', lead: 'Mike' }
];

const INITIAL_REPOS: Repository[] = [
    { id: 'r1', name: 'ink-cli', language: ['TypeScript'], visibility: 'Public' },
    { id: 'r2', name: 'auth-service', language: ['Go', 'Rust'], visibility: 'Private' }
];

export default function App() {
    const [view, setView] = useState<View>('SPLASH');
    const [user, setUser] = useState<string | null>(null);
    const [requests, setRequests] = useState<Request[]>([]);

    // Data state
    const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
    const [repos, setRepos] = useState<Repository[]>(INITIAL_REPOS);
    const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

    const handleLogin = (name: string) => {
        setUser(name);
        setView('DASHBOARD');
    };

    const handleRequestSubmit = (request: Request) => {
        setRequests([...requests, request]);
        // Optimistically update local state for demo purposes if it's a modify
        if (request.action === 'MODIFY') {
            if (request.type === 'TEAM') {
                setTeams(teams.map(t => t.id === request.data.id ? { ...t, ...request.data } : t));
            } else {
                setRepos(repos.map(r => r.id === request.data.id ? { ...r, ...request.data } : r));
            }
        } else {
            // Add
            if (request.type === 'TEAM') {
                setTeams([...teams, request.data]);
            } else {
                setRepos([...repos, request.data]);
            }
        }
        setView('DASHBOARD');
    };

    const getEntityToModify = () => {
        if (view === 'MANAGE_TEAM_MODIFY_FORM') return teams.find(t => t.id === selectedEntityId);
        if (view === 'MANAGE_REPO_MODIFY_FORM') return repos.find(r => r.id === selectedEntityId);
        return undefined;
    };

    return (
        <Box flexDirection="column" minHeight={20}>
            {view === 'SPLASH' && <Splash onComplete={() => setView('LOGIN_FLOW')} />}
            {view === 'LOGIN_FLOW' && <LoginServer onLogin={handleLogin} />}
            {view === 'DASHBOARD' && user && (
                <Dashboard
                    user={user}
                    onSelect={(option: string) => {
                        if (option === 'manage_teams_add') setView('MANAGE_TEAM_ADD');
                        if (option === 'manage_teams_modify') setView('MANAGE_TEAM_MODIFY_SELECT');
                        if (option === 'manage_repos_add') setView('MANAGE_REPO_ADD');
                        if (option === 'manage_repos_modify') setView('MANAGE_REPO_MODIFY_SELECT');
                        if (option === 'view_requests') setView('VIEW_REQUESTS');
                    }}
                />
            )}

            {/* Entity Selectors */}
            {view === 'MANAGE_TEAM_MODIFY_SELECT' && (
                <EntitySelector
                    items={teams.map(t => ({ label: t.name, value: t.id }))}
                    onSelect={(id) => {
                        setSelectedEntityId(id);
                        setView('MANAGE_TEAM_MODIFY_FORM');
                    }}
                    onCancel={() => setView('DASHBOARD')}
                />
            )}
            {view === 'MANAGE_REPO_MODIFY_SELECT' && (
                <EntitySelector
                    items={repos.map(r => ({ label: r.name, value: r.id }))}
                    onSelect={(id) => {
                        setSelectedEntityId(id);
                        setView('MANAGE_REPO_MODIFY_FORM');
                    }}
                    onCancel={() => setView('DASHBOARD')}
                />
            )}

            {/* Forms */}
            {(view === 'MANAGE_TEAM_ADD' || view === 'MANAGE_TEAM_MODIFY_FORM') && (
                <EntityForm
                    type="TEAM"
                    action={view === 'MANAGE_TEAM_ADD' ? 'ADD' : 'MODIFY'}
                    initialData={view === 'MANAGE_TEAM_MODIFY_FORM' ? getEntityToModify() : undefined}
                    onSubmit={handleRequestSubmit}
                    onCancel={() => setView('DASHBOARD')}
                />
            )}
            {(view === 'MANAGE_REPO_ADD' || view === 'MANAGE_REPO_MODIFY_FORM') && (
                <EntityForm
                    type="REPO"
                    action={view === 'MANAGE_REPO_ADD' ? 'ADD' : 'MODIFY'}
                    initialData={view === 'MANAGE_REPO_MODIFY_FORM' ? getEntityToModify() : undefined}
                    onSubmit={handleRequestSubmit}
                    onCancel={() => setView('DASHBOARD')}
                />
            )}

            {view === 'VIEW_REQUESTS' && (
                <RequestList requests={requests} onBack={() => setView('DASHBOARD')} />
            )}
        </Box>
    );
}
