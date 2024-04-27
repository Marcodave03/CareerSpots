// import Users from'./UsersModel';
// import Staff from './StaffModel';
// import Job from './JobModel';
// import Company from './CompanyModel';
// import JobApplication from './JobapplicationModel';

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

