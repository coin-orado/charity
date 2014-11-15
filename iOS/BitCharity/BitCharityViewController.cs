using System;
using MonoTouch.Foundation;
using MonoTouch.UIKit;
using RestSharp;
using Newtonsoft.Json;
using System.Linq;

namespace BitCharity
{


	public class TableSource : UITableViewSource
	{
		public TableSource(OrganizationViewModel[] x)
		{
			Model = x;
		}

		public OrganizationViewModel[] Model;

		public event Action<OrganizationViewModel> Tap;

		public override int RowsInSection (UITableView tableview, int section)
		{
			return Model.Length;
		}

		public override void RowSelected (UITableView tableView, NSIndexPath indexPath)
		{
			if (Tap != null)
				Tap (Model [indexPath.Row]);
		}

		public override UITableViewCell GetCell (UITableView tableView, NSIndexPath indexPath)
		{
			var cell = OrganizationItem.Create ();
			cell.Apply ( Model[indexPath.Row].Name, Model[indexPath.Row].Description );
			return cell;
		}

	}

	public partial class BitCharityViewController : UITableViewController
	{

		public BitCharityViewController (IntPtr handle) : base (handle)
		{
		}

		#region View lifecycle

		public override void ViewDidLoad ()
		{
			base.ViewDidLoad ();

			NSTimer.CreateRepeatingScheduledTimer (2, ()=>{

				var rest = new RestClient ("https://intense-escarpment-3682.herokuapp.com/");
				rest.ExecuteAsync (new RestRequest("organization"), response => InvokeOnMainThread (() => {
					var results = JsonConvert.DeserializeObject<OrganizationViewModel[]> (response.Content);
					var cellSource = new TableSource (results);
					cellSource.Tap += (obj) => {
						Organizationpage.Model = obj;
						PerformSegue ("GoToOrganization", this);
					};
					TableView.Source = cellSource;
					TableView.ReloadData ();

					if(Organizationpage.Model != null)
					{
						var newModel = results.SingleOrDefault( x => x.Id == Organizationpage.Model.Id);
						if(newModel != null) {
							Organizationpage.Model = newModel;
							Console.WriteLine ("updated model");
						}
					}

				}));

			});
				
			// Perform any additional setup after loading the view, typically from a nib.
		}

		public override void ViewWillAppear (bool animated)
		{
			base.ViewWillAppear (animated);
		}

		public override void ViewDidAppear (bool animated)
		{
			base.ViewDidAppear (animated);
		}

		public override void ViewWillDisappear (bool animated)
		{
			base.ViewWillDisappear (animated);
		}

		public override void ViewDidDisappear (bool animated)
		{
			base.ViewDidDisappear (animated);
		}

		#endregion
	}
}

