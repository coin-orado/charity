using Newtonsoft.Json;
using RestSharp;

namespace BitCharity
{

	public class OrganizationViewModel
	{

		[JsonProperty("id")]
		public string Id {get;set;}

		[JsonProperty("name")]
		public string Name {get;set;}

		[JsonProperty("description")]
		public string Description {get;set;}

		[JsonProperty("contact_info")]
		public ContactInfo ContactInfo { get;set;}

		[JsonProperty("public_key")]
		public string PublicKey { get; set; }

		[JsonProperty("payment_status")]
		public PaymentStats PaymentStat { get; set; }

		[JsonProperty("background")]
		public string BackgroundImage { get; set; }

		[JsonProperty("qr_code")]
		public string QRCode { get; set; }

	}

	public class PaymentStats
	{
		[JsonProperty("max")]
		public int Maximum { get;set;}

		[JsonProperty("total")]
		public int Total { get;set;}

		[JsonProperty("count")]
		public int Count { get;set;}
	}

}