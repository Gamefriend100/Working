const express = require('express');
const cors = require('cors');
const initJobs = require('../jobs');

const {
    apps,
    auth,
    branches,
    branchZones,
    departments,
    divisions,
    permissions,
    positions,
    roles,
    tutorials,
    users,
    supplies,
    categorySupplies
} = require('../routes');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.paths = {
            apps: '/intranet/apps',
            auth: '/intranet/auth',
            branches: '/intranet/branches',
            branchZones: '/intranet/branch-zones',
            departments: '/intranet/departments',
            divisions: '/intranet/divisions',
            permissions: '/intranet/permissions',
            positions: '/intranet/positions',
            roles: '/intranet/roles',
            simulator: '/intranet/simulator',
            tutorials: '/intranet/tutorials',
            users: '/intranet/users',
            supplies:'/intranet/supplies',
            categorySupplies: '/intranet/supplies/category'
        }

        this.middlewares();
        this.routes();
        this.jobs();
    }

    middlewares() {
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes() {
        // COR
        this.app.use(this.paths.apps, apps);
        this.app.use(this.paths.auth, auth);
        this.app.use(this.paths.branches, branches);
        this.app.use(this.paths.branchZones, branchZones);
        this.app.use(this.paths.departments, departments);
        this.app.use(this.paths.divisions, divisions);
        this.app.use(this.paths.permissions, permissions);
        this.app.use(this.paths.positions, positions);
        this.app.use(this.paths.roles, roles);
        this.app.use(this.paths.tutorials, tutorials);
        this.app.use(this.paths.users, users);
        //SAFETY
        this.app.use(this.paths.supplies, supplies);
        this.app.use(this.paths.categorySupplies, categorySupplies);
    }

    jobs() {
        initJobs();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Application running on port: ${this.port}`);
        });
    }
}

module.exports = Server;