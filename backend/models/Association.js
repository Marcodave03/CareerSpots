import db from "../config/Database.js"; 
import Users from'./UsersModel.js';
import Staff from './StaffModel.js';
import Job from './JobModel.js';
import Company from './CompanyModel.js';
import JobApplication from './JobApplicationModel.js';

const user = db.define("Users", Users, 
{
    tableName: "users"
}); 
const staff = db.define("Staffs", Staff, 
{
    tableName: "staffs"
}); 

const job = db.define("Jobs", Job, 
{
    tableName: "job"
}); 

const company = db.define("Companies", Company, 
{
    tableName: "companies"
}); 

const jobApplication = db.define("Job Applications", JobApplication, 
{
    tableName: "job applications"
}); 
user.hasOne(staff, {
    foreignKey: "user_id", 
    onDelete: "CASCADE", 
    onUpdate: "RESTRICT"
});
user.hasMany(jobApplication, {
    foreignKey: "user_id", 
    onDelete: "RESTRICT", 
    onUpdate: "RESTRICT"
}); 
staff.belongsTo(user, {
    foreignKey: "user_id", 
    onDelete: "CASCADE", 
    onUpdate: "RESTRICT"
});

staff.hasMany(job, {
    foreignKey: "staff_id", 
    onDelete: "RESTRICT", 
    onUpdate: "RESTRICT"
}); 

company.hasMany(staff, {
    foreignKey: "company_id", 
    onDelete: "RESTRICT", 
    onUpdate: "RESTRICT"
}); 

staff.belongsTo(company, {
    foreignKey: "company_id", 
    onDelete: "RESTRICT", 
    onUpdate: "RESTRICT"
}); 

jobApplication.belongsTo(user, {
    foreignKey: "user_id", 
    onDelete: "RESTRICT", 
    onUpdate: "RESTRICT"
}); 

job.belongsTo(staff, {
    foreignKey: "staff_id", 
    onDelete: "RESTRICT", 
    onUpdate: "RESTRICT"
}); 

job.hasMany(jobApplication, 
{
    foreignKey: "job_id", 
    onDelete: "CASCADE", 
    onUpdate: "RESTRICT"
}); 

jobApplication.belongsTo(job, 
{
    foreignKey: "job_id", 
    onDelete: "CASCADE", 
    onUpdate: "RESTRICT"
}); 

db.sync();
export default db; 

