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

const jobApplication = db.define("JobApplications", JobApplication, 
{
    tableName: "job applications",
});

user.hasOne(staff, {
    foreignKey: "user_id", 
    onDelete: "CASCADE", 
    onUpdate: "CASCADE"
});
user.hasMany(jobApplication, {
    foreignKey: "user_id", 
    onDelete: "CASCADE", 
    onUpdate: "CASCADE"
}); 
staff.belongsTo(user, {
    foreignKey: "user_id", 
    onDelete: "CASCADE", 
    onUpdate: "CASCADE"
});

staff.hasMany(job, {
    foreignKey: "staff_id", 
    onDelete: "CASCADE", 
    onUpdate: "CASCADE"
}); 

company.hasMany(staff, {
    foreignKey: "company_id", 
    onDelete: "CASCADE", 
    onUpdate: "CASCADE"
}); 

staff.belongsTo(company, {
    foreignKey: "company_id", 
    onDelete: "CASCADE", 
    onUpdate: "CASCADE"
}); 

jobApplication.belongsTo(user, {
    foreignKey: "user_id", 
    onDelete: "CASCADE", 
    onUpdate: "CASCADE"
}); 

job.belongsTo(staff, {
    foreignKey: "staff_id", 
    onDelete: "CASCADE", 
    onUpdate: "CASCADE"
}); 

job.hasMany(jobApplication, 
{
    foreignKey: "job_id", 
    onDelete: "CASCADE", 
    onUpdate: "CASCADE"
}); 

jobApplication.belongsTo(job, 
{
    foreignKey: "job_id", 
    onDelete: "CASCADE", 
    onUpdate: "CASCADE"
}); 

// db.sync();

// var userData = 
// [
//     {
//         name: "staff telkomsol", 
//         email: "stafftelkomsol@gmail.com",
//         password: "password", 
//         role: "staff"
//     },
//     {
//         name: "staff mie gacaan", 
//         email: "staffmiegacaan@gmail.com",
//         password: "password", 
//         role: "staff"
//     },
//     {
//         name: "sarah user", 
//         email: "sarahuser@gmail.com",
//         password: "password", 
//         role: "user"
//     }
// ]
// user.bulkCreate(userData); 
// var companyData = 
// [
//     {
//         company_name: "telkomsol", 
//         location: "jakarta"
//     }, 
//     {
//         company_name: "mi gacaan", 
//         location: "tangerang"
//     }
// ]
// company.bulkCreate(companyData); 
// var staffData = 
// [
//     {
//         user_id: 1,
//         company_id: 1
//     }, 
//     {
//         user_id: 2,
//         company_id: 2
//     }
// ]
// staff.bulkCreate(staffData); 
// var jobData = 
// [
//    {
//         job_name: "backend software developer", 
//         job_type: "software developer",
//         job_level: "mid-level", 
//         job_location: "Jakarta, Indonesia", 
//         job_salary: "1mil - 2mil rupiah/month",
//         is_hiring: "true", 
//         company_name: "Telkomsol",
//         staff_id: 1
//     },
//     {
//         job_name: "frontend software developer", 
//         job_type: "software developer",
//         job_level: "mid-level", 
//         job_location: "Jakarta, Indonesia", 
//         job_salary: "1mil - 2mil rupiah/month",
//         is_hiring: "true", 
//         company_name: "Telkomsol",
//         staff_id: 1
//     }, 
//     {
//         job_name: "data analyst intern", 
//         job_type: "data analyst",
//         job_level: "entry-level", 
//         job_location: "Jakarta, Indonesia", 
//         job_salary: "500k rupiah/month",
//         is_hiring: "true", 
//         company_name: "Telkomsol",
//         staff_id: 1}];
// job.bulkCreate(jobData);
// db.sync();
export default db;