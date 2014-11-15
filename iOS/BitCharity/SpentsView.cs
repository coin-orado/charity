using System;
using MonoTouch.UIKit;
using MonoTouch.Foundation;
using Newtonsoft.Json;
using RestSharp;

namespace BitCharity
{
	[Register("SpentsViewController")]
	public class SpentsView : UITableViewController
	{

		NSTimer timer;

		public SpentsView (IntPtr handle):base(handle)
		{
		}

		public override void ViewDidLoad ()
		{

			base.ViewDidLoad ();

			var backbutton = new UIBarButtonItem ("Back", UIBarButtonItemStyle.Done, null) {
				TintColor = UIColor.White
			};
			backbutton.Clicked += (sender, e) => NavigationController.PopViewControllerAnimated (true);
			NavigationItem.SetLeftBarButtonItem (backbutton, false);

			Title = Organizationpage.Model.Name + "'s Expenses";

			var restClient = new RestClient("https://intense-escarpment-3682.herokuapp.com/");
			var request = new RestRequest ("expenses/"+Organizationpage.Model.Id);

			timer = NSTimer.CreateRepeatingScheduledTimer (2, () => 
				restClient.ExecuteAsync (request, response => InvokeOnMainThread (() => {
				var results = JsonConvert.DeserializeObject<X> (response.Content).Items;
				var source = new SpentTableSource (results);
				TableView.Source = source;
				TableView.ReloadData ();
			})) );

		}

		public override void ViewDidDisappear (bool animated)
		{
			base.ViewDidDisappear (animated);
			timer.Invalidate ();
		}
			

	}

	public class SpentTableSource : UITableViewSource
	{
		readonly Spent[] data;

		public SpentTableSource(Spent[] data)
		{
			this.data = data;
		}

		public override int RowsInSection (UITableView tableview, int section)
		{
			return data.Length;
		}

		public override UITableViewCell GetCell (UITableView tableView, NSIndexPath indexPath)
		{
			var cell = SpentCell.Create ();
			cell.Apply (data[indexPath.Row].PaidToName, data[indexPath.Row].Amount.ToString (), data[indexPath.Row].PaidTo);
			return cell;
		}

	}

	public class X
	{
		[JsonProperty("items")]
		public Spent[] Items { get; set; }
	}

	public class Spent
	{

		[JsonProperty("paid_to_name")]
		public string PaidToName { get; set; }

		[JsonProperty("paid_to")]
		public string PaidTo { get; set; }

		[JsonProperty("amount")]
		public int Amount { get; set; }

	}

}