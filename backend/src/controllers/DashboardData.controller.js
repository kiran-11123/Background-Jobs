import { DashBoardService } from "../services/DashboardData.service.js"
import app_logger from "../utils/logger/App_logger.js";

export const DashBoardController = async (req, res) => {
  app_logger.info(`Entered into the DashBoard Controller`);
  try {
    const user_id = req.user.user_id;
    const stats = await DashBoardService(user_id);
    app_logger.info(`Data Fetched successfully for the Dashboard`);

    return res.status(200).json({
      message: "Data Fetched Successfully",
      data: stats 
    });
  } catch (er) {
    app_logger.error(`Error fetching dashboard data: ${er}`);
    return res.status(500).json({
      message: "Internal Server Error",
      error: er.message
    });
  }
}
