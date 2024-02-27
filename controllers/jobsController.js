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
  // condition for searchig filters
  const { status, workType, search, sort } = req.query;
  //  store userId
  const queryObject = {
    createdBy: req.user.userId,
  };

  // logic for filter

  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (workType && workType !== "all") {
    queryObject.workType = workType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let queryResult = jobsModel.find(queryObject);

  // sort result using condition
  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }
  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }
  // based on position
  if (sort === "a-z") {
    queryResult = queryResult.sort("-position");
  }
  if (sort === "z-a") {
    queryResult = queryResult.sort("position");
  }

  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  queryResult = queryResult.skip(skip).limit(limit);
  //jobs count
  const totalJobs = await jobsModel.countDocuments(queryResult);
  const numOfPage = Math.ceil(totalJobs / limit);

  const jobs = await queryResult;

  // const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs,
    jobs,
    numOfPage,
  });
};

export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please Provide All fields");
  }
  const job = await jobsModel.findById({ _id: id });
  if (!job) {
    next("No Jobs Found with this id");
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("You are not authorized person to update job");
    return;
  }
  const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ message: "Job Modify", updateJob });
};

export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  const job = await jobsModel.findOne({ _id: id });
  if (!job) {
    next("No job found");
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("Not authorized to delete job");
  }
  await job.deleteOne();
  res.status(200).json({ message: "Job deleted" });
};
