import jobs_logger from "../../src/utils/logger/jobs_logger.js";
export async function sendActivitySummary(payload) {
  const { userId, period } = payload;

  try {
    app_logger.info(`Generating ${period} activity summary for user: ${userId}`);

    // 1️⃣ Fetch user
    const user = await Users.findById(userId);
    if (!user) throw new Error(`User not found: ${userId}`);

    // 2️⃣ Determine time range based on period
    let startDate;
    const now = new Date();

    if (period === "daily") {
      startDate = new Date(now);
      startDate.setHours(0, 0, 0, 0);
    } else if (period === "weekly") {
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
    } else if (period === "monthly") {
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 1);
    } else {
      throw new Error(`Invalid period: ${period}`);
    }

    // 3️⃣ Fetch user activity in the period
    const activities = await UserActivity.find({
      userId,
      createdAt: { $gte: startDate, $lte: now },
    });

    // 4️⃣ Aggregate activity summary
    const summary = {
      totalLogins: activities.filter(a => a.type === "login").length,
      postsCreated: activities.filter(a => a.type === "post").length,
      commentsMade: activities.filter(a => a.type === "comment").length,
      likesGiven: activities.filter(a => a.type === "like").length,
    };

    app_logger.info(`Activity summary for user ${userId}: ${JSON.stringify(summary)}`);

    // 5️⃣ Send summary email
    const emailSubject = `Your ${period} activity summary`;
    const emailBody = `
      Hi ${user.name},<br><br>
      Here is your activity summary for the ${period}:<br>
      - Logins: ${summary.totalLogins}<br>
      - Posts Created: ${summary.postsCreated}<br>
      - Comments Made: ${summary.commentsMade}<br>
      - Likes Given: ${summary.likesGiven}<br><br>
      Keep engaging!<br>
      Regards,<br>
      Your App Team
    `;

    await sendEmail({
      to: user.email,
      subject: emailSubject,
      html: emailBody,
    });

    app_logger.info(`Activity summary email sent to user ${userId}`);

    return { success: true, summary };
  } catch (err) {
    app_logger.error(`Error in sendActivitySummary for user ${userId}: ${err.message}`);
    throw err;
  }
}