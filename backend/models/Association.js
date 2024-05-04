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

// // Define association
// Users.hasOne(Staff);

// // Define associations
// Staff.belongsTo(Users, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Delete staff if user is deleted
// Staff.belongsTo(Company, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Delete staff if company is deleted

// // Define association
// Job.belongsTo(Staff, { foreignKey: 'posted_by', onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Delete job if staff member who posted it is deleted
// Job.hasMany(JobApplication, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Delete job applications if job is deleted

// // Define associations
// JobApplication.belongsTo(Users, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Delete job application if user is deleted
// JobApplication.belongsTo(Job, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Delete job application if job is deleted

// // Define association
// Company.hasMany(Staff);

