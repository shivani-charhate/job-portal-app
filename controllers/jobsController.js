import jobsModel from "../models/jobsModel.js";

export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Add All fields");
  }
  req.body.createdBy = req.user.userId;
  const newJob = await jobsModel.create(req.body);
  res.status(200).json({
    message: "New Job Created",
    newJob,
  });
};
export const getAllJobs = async (req, res, next) => {
  const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    message: "All Jobs Against the User",
    totalJobs: jobs.length,
    jobs,
  });
};
