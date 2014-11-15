// WARNING
//
// This file has been generated automatically by Xamarin Studio to store outlets and
// actions made in the UI designer. If it is removed, they will be lost.
// Manual changes to this file may not be handled correctly.
//
using MonoTouch.Foundation;
using System.CodeDom.Compiler;

namespace BitCharity
{
	[Register ("OrganizationItem")]
	partial class OrganizationItem
	{
		[Outlet]
		MonoTouch.UIKit.UITextView orgDesc { get; set; }

		[Outlet]
		MonoTouch.UIKit.UILabel orgTitle { get; set; }
		
		void ReleaseDesignerOutlets ()
		{
			if (orgTitle != null) {
				orgTitle.Dispose ();
				orgTitle = null;
			}

			if (orgDesc != null) {
				orgDesc.Dispose ();
				orgDesc = null;
			}
		}
	}
}
