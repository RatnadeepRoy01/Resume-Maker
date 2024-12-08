import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({ region: "ap-south-1" }); // Replace 'your-region' with your AWS region

export const getSecrets = async (event) => {
  try {
    const secretName = "profilenxtSecrets"; // Replace with your secret name

    // Create a command to get the secret value
    const command = new GetSecretValueCommand({ SecretId: secretName });

    // Fetch the secret
    const response = await client.send(command);

    // Check if the secret is a string or binary
    if (response.SecretString) {
      const secret = JSON.parse(response.SecretString); // Parse JSON if it's a string
      console.log("Retrieved secret (JSON):", secret);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Secret retrieved successfully", secret }),
      };
    } else if (response.SecretBinary) {
      // Decode binary secret if it's stored as binary
      const binaryBuffer = Buffer.from(response.SecretBinary, "base64");
      console.log("Retrieved secret (Binary):", binaryBuffer.toString("utf-8"));
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Binary secret retrieved successfully",
          secret: binaryBuffer.toString("utf-8"),
        }),
      };
    } else {
      console.error("No secret found in response.");
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No secret found in response" }),
      };
    }
  } catch (error) {
    // Handle specific error codes if needed
    if (error.name === "ResourceNotFoundException") {
      console.error("Secret not found:", error.message);
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Secret not found", error: error.message }),
      };
    } else if (error.name === "AccessDeniedException") {
      console.error("Access denied:", error.message);
      return {
        statusCode: 403,
        body: JSON.stringify({ message: "Access denied", error: error.message }),
      };
    } else {
      console.error("Unexpected error occurred:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal server error", error: error.message }),
      };
    }
  }
};
