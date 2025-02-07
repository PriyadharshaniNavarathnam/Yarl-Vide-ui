using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Data.SqlClient;
using System.Data;
using Microsoft.AspNetCore.Authorization;

namespace Yarl_Vibe_api.Controllers.waiterController
{
    public class WaiterController : Controller
    {
        private IConfiguration _configuration;
        public WaiterController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        //Get Table details
        [HttpGet]
        [Route("GetTableData")]
        public JsonResult GetData()
        {
            string query = "select * from tbl_Table";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("yarlVibeDBCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        // Update Table Status
        [HttpPost]
        [Route("UpdateDatabaseTableStatus")]
        public JsonResult UpdateDatabaseTableStatus([FromBody] JObject requestData)
        {
            string tableCode = requestData["tableCode"].ToString();
            string newStatus = requestData["newStatus"].ToString();
            string query = "UPDATE tbl_Table SET TableStatus = @newStatus WHERE TableCode = @tableCode;";
            string connectionString = _configuration.GetConnectionString("yarlVibeDBCon");

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    // Add parameters
                    command.Parameters.AddWithValue("@newStatus", newStatus);
                    command.Parameters.AddWithValue("@tableCode", tableCode);

                    try
                    {
                        connection.Open();
                        int rowsAffected = command.ExecuteNonQuery();
                        if (rowsAffected > 0)
                        {
                            return new JsonResult("TableStatus updated successfully!");
                        }
                        else
                        {
                            return new JsonResult("No rows were updated.");
                        }
                    }
                    catch (Exception ex)
                    {
                        return new JsonResult($"Error updating TableStatus: {ex.Message}");
                    }
                }
            }
        }
        //Get Notification Data
        [HttpGet]
        [Route("GetNotificationData")]
        public JsonResult GetNotificationData()
        {
            string query = "SELECT * FROM Orders WHERE FoodStatus IN ('processing', 'completed', 'delivered')";
            DataTable table = new DataTable();
            string sqlDatasource = _configuration.GetConnectionString("yarlVibeDBCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDatasource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        //Update notification food status
        [HttpPost]
        [Route("UpdateNotificationFoodStatus")]
        public JsonResult UpdateNotificationFoodStatus([FromBody] JObject requestData)
        {
            int orderID = (int)requestData["orderID"];
            string newStatus = requestData["foodStatus"].ToString();
            string query = "UPDATE Orders SET FoodStatus = @foodStatus WHERE OrderID = @orderID;";
            string connectionString = _configuration.GetConnectionString("yarlVibeDBCon");

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    // Add parameters
                    command.Parameters.AddWithValue("@foodStatus", newStatus);
                    command.Parameters.AddWithValue("@orderID", orderID);

                    try
                    {
                        connection.Open();
                        int rowsAffected = command.ExecuteNonQuery();
                        if (rowsAffected > 0)
                        {
                            return new JsonResult("TableStatus updated successfully!");
                        }
                        else
                        {
                            return new JsonResult("No rows were updated.");
                        }
                    }
                    catch (Exception ex)
                    {
                        return new JsonResult($"Error updating TableStatus: {ex.Message}");
                    }
                }
            }
        }

    }
}
