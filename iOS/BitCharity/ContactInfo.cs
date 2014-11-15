using RestSharp;
using Newtonsoft.Json;

namespace BitCharity
{
	public class ContactInfo
	{

		[JsonProperty("phone")]
		public string Phone { get; set; }

		[JsonProperty("website")]
		public string Website { get; set; }

		[JsonProperty("address")]
		public string Address { get; set; }

	}

}