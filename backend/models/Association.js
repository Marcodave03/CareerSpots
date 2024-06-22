import db from "../config/Database.js";
import Users from './UsersModel.js';
import Staff from './StaffModel.js';
import Job from './JobModel.js';
import JobDetail from "./JobDetailModel.js"; 
import Company from './CompanyModel.js';
import JobApplication from './JobapplicationModel.js';
import Interview from "./InterviewModel.js";
import UserInterview from "./UserInterview.js";
import Messages from "./MessagesModel.js";
import ReceivedMessages from "./ReceivedMessagesModel.js";
import UserDetail from "./UserDetailModel.js"; 

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

const interview = db.define("Interviews", Interview,
    {
        tableName: "interviews"
    }
);

const userInterview = db.define("UserInterviews", UserInterview,
    {
        tableName: "userInterviews"
    }
)

const messages = db.define("Messages", Messages,
    {
        tableName: "messages"
    }
)

const receivedMessages = db.define("ReceivedMessages", ReceivedMessages,
    {
        tableName: "receivedMessages"
    }
)

const userDetail = db.define("UserDetail", UserDetail)
{
    {
        tableName: "userDetail"; 
    }
}

const jobDetail = db.define("JobDetail", JobDetail)
{
    {
        tableName: "jobDetail";
    }
}

user.hasMany(messages,
    {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
);

messages.belongsTo(user,
    {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
)

user.hasMany(receivedMessages,
    {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
)

receivedMessages.belongsTo(user,
    {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
)

messages.hasMany(receivedMessages,
    {
        foreignKey: "message_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
)

receivedMessages.belongsTo(messages,
    {
        foreignKey: "message_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
)

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

user.hasOne(userDetail, 
{
    foreignKey: "user_id", 
    onDelete: "CASCADE", 
    onUpdate: "CASCADE"
}
)

job.hasOne(jobDetail, 
{
    foreignKey: "job_id", 
    onDelete: "CASCADE", 
    onUpdate: "CASCADE"
})

jobDetail.belongsTo(job, 
    {
        foreignKey: "job_id", 
        onDelete: "CASCADE", 
        onUpdate: "CASCADE"
    })
    

userDetail.belongsTo(user, 
    {
        foreignKey: "user_id", 
        onDelete: "CASCADE", 
        onUpdate: "CASCADE"
    }
); 

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

user.hasMany(userInterview, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

userInterview.belongsTo(interview,
    {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });

interview.hasMany(userInterview,
    {
        foreignKey: "interview_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });

userInterview.belongsTo(interview,
    {
        foreignKey: "interview_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    });

db.sync();

// var interviewData = 
// [
//     {
//         interview_name: "Ace your React JS interview", 
//         interview_link: "https://www.youtube.com/embed/3BN-YHcJfOY?si=E2QvxKQ-lSO_vs4D", 
//         interview_imagelink: "https://img.youtube.com/vi/3BN-YHcJfOY/default.jpg", 
//         interview_prompt: "React JS"
//     },
//     {
//         interview_name: "Master Node JS interview", 
//         interview_link: "https://www.youtube.com/embed/FdaVsce3ftQ?si=FS5ldzReq_rp0Rb_", 
//         interview_imagelink: "https://img.youtube.com/vi/FdaVsce3ftQ/default.jpg", 
//         interview_prompt: "Node JS"
//     },
//     {
//         interview_name: "Guide to System Design interview", 
//         interview_link: "https://www.youtube.com/embed/jPKTo1iGQiE?si=fehDDBrezJTL7eo_", 
//         interview_imagelink: "https://img.youtube.com/vi/jPKTo1iGQiE/default.jpg", 
//         interview_prompt: "System Design"
//     },
//     {
//         name: "sarah user", 
//         email: "sarahuser@gmail.com",
//         password: "password", 
//         role: "user"
//     }
// ]
// interview.bulkCreate(interviewData); 
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

// db.sync();
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
//         user_id: 13,
//         company_id: 9
//     }, 
//     {
//         user_id: 14,
//         company_id: 10
//     }
// ]
// staff.bulkCreate(staffData); 
// var jobData = 
// [
//    {
//         job_name: "backend software developer", 
//         job_type: "Full Time",
//         job_level: "Mid Level", 
//         job_location: "Jakarta, Indonesia", 
//         job_salary: 2200,
//         is_hiring: "true", 
//         company_name: "Telkomsol",
//         staff_id: 9
//     },
//     {
//         job_name: "frontend software developer", 
//         job_type: "Full Time",
//         job_level: "Mid Level", 
//         job_location: "Jakarta, Indonesia", 
//         job_salary: 1560,
//         is_hiring: "true", 
//         company_name: "Telkomsol",
//         staff_id: 9
//     }, 
//     {
//         job_name: "data analyst intern", 
//         job_type: "Part Time",
//         job_level: "Entry Level", 
//         job_location: "Jakarta, Indonesia", 
//         job_salary: 600,
//         is_hiring: "true", 
//         company_name: "Telkomsol",
//         staff_id: 9}];
// job.bulkCreate(jobData);
// db.sync();
export default db;