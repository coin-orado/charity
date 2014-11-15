
using System;
using System.Drawing;

using MonoTouch.Foundation;
using MonoTouch.UIKit;

namespace BitCharity
{
	public partial class OrganizationItem : UITableViewCell
	{
		public static readonly UINib Nib = UINib.FromName ("OrganizationItem", NSBundle.MainBundle);
		public static readonly NSString Key = new NSString ("OrganizationItem");

		public OrganizationItem (IntPtr handle) : base (handle)
		{
		}

		public void Apply(string title, string desc)
		{
			orgTitle.Text = title;
			orgDesc.Text = desc;
			orgDesc.TextColor = UIColor.LightGray;
			orgDesc.Font = UIFont.FromName ("Avenir Light", 15);
		}

		public static OrganizationItem Create ()
		{
			return (OrganizationItem)Nib.Instantiate (null, null) [0];
		}
	}
}

