import * as React from "react";
import Layout from "@/components/layout";

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = React.useState<string[]>([
    "You have a new follower!",
    "Your post was liked by a friend.",
    "Update available for your app.",
  ]);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        <ul className="list-disc pl-5">
          {notifications.map((notification, index) => (
            <li key={index} className="mb-2">
              {notification}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Notifications;
