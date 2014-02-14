$(window).on("load",
function() {
	window.olark ||
	function(a) {
		var b = window,
		c = document,
		d = "https:" == b.location.protocol ? "https:": "http:",
		e = a.name,
		f = "load",
		g = function() {
			function h() {
				i.P(f),
				b[e](f)
			}
			b[e] = function() { (i.s = i.s || []).push(arguments)
			};
			for (var i = b[e]._ = {},
			j = a.methods.length; j--;) !
			function(a) {
				b[e][a] = function() {
					b[e]("call", a, arguments)
				}
			} (a.methods[j]);
			i.l = a.loader,
			i.i = g,
			i.p = {
				0 : +new Date
			},
			i.P = function(a) {
				i.p[a] = new Date - i.p[0]
			},
			b.addEventListener ? b.addEventListener(f, h, !1) : b.attachEvent("on" + f, h);
			var k = function() {
				function b(a) {
					return a = "head",
					["<", a, "></", a, "><", f, ' onload="var d=', q, ";d.getElementsByTagName('head')[0].", j, "(d.", l, "('script')).", m, "='", d, "//", i.l, "'", '"', "></", f, ">"].join("")
				}
				var f = "body",
				g = c[f];
				if (!g) return setTimeout(k, 100);
				i.P(1);
				var h, j = "appendChild",
				l = "createElement",
				m = "src",
				n = c[l]("div"),
				o = n[j](c[l](e)),
				p = c[l]("iframe"),
				q = "document",
				r = "domain";
				n.style.display = "none",
				g.insertBefore(n, g.firstChild).id = e,
				p.frameBorder = "0",
				p.id = e + "-loader",
				/MSIE[ ]+6/.test(navigator.userAgent) && (p.src = "javascript:false"),
				p.allowTransparency = "true",
				o[j](p);
				try {
					p.contentWindow[q].open()
				} catch(s) {
					a[r] = c[r],
					h = "javascript:var d=" + q + ".open();d.domain='" + c.domain + "';",
					p[m] = h + "void(0);"
				}
				try {
					var t = p.contentWindow[q];
					t.write(b()),
					t.close()
				} catch(u) {
					p[m] = h + 'd.write("' + b().replace(/"/g, String.fromCharCode(92) + '"') + '");d.close();'
				}
				i.P(2)
			};
			k()
		};
		g()
	} ({
		loader: "static.olark.com/jsclient/loader0.js",
		name: "olark",
		methods: ["configure", "extend", "declare", "identify"]
	}),
	$(function() {
		olark.configure("locale.welcome_title", YinData.translate.__("Chat Online Now")),
		olark.configure("locale.chatting_title", YinData.translate.__("Live Help: Now Chatting")),
		olark.configure("locale.unavailable_title", YinData.translate.__("Live Help: Offline")),
		olark.configure("locale.busy_title", YinData.translate.__("Live Help: Busy")),
		olark.configure("locale.away_message", YinData.translate.__("Our live support feature is currently offline, Please try again later.")),
		olark.configure("locale.loading_title", YinData.translate.__("Loading Olark...")),
		olark.configure("locale.welcome_message", YinData.translate.__("Questions? We'd love to chat!")),
		olark.configure("locale.busy_message", YinData.translate.__("All of our representatives are with other customers at this time. We will be with you shortly.")),
		olark.configure("locale.chat_input_text", YinData.translate.__("Type here and hit <enter>")),
		olark.configure("locale.offline_note_message", YinData.translate.__("We are offline, send us a message")),
		olark.configure("locale.offline_note_thankyou_text", YinData.translate.__("Thank you for your message.  We will get back to you as soon as we can.")),
		olark.configure("locale.offline_note_error_text", YinData.translate.__("You must complete all fields and specify a valid email address")),
		olark.configure("locale.offline_note_sending_text", YinData.translate.__("Sending...")),
		olark.configure("locale.operator_is_typing_text", YinData.translate.__("is typing...")),
		olark.configure("locale.operator_has_stopped_typing_text", YinData.translate.__("has stopped typing")),
		olark.configure("locale.introduction_error_text", YinData.translate.__("Please enter your name and company email in case we get disconnected.")),
		olark.configure("locale.introduction_messages", YinData.translate.__("Tell us a little bit about yourself so we can connect!")),
		olark.configure("locale.introduction_submit_button_text", YinData.translate.__("Send")),
		olark.configure("locale.disabled_input_text_when_convo_has_ended", YinData.translate.__("chat ended, refresh for new chat")),
		olark.configure("locale.disabled_panel_text_when_convo_has_ended", YinData.translate.__("This conversation has ended, but all you need to do is refresh the page to start a new one!")),
		olark.configure("locale.name_input_text", YinData.translate.__("Name")),
		olark.configure("locale.email_input_text", YinData.translate.__("Company Email")),
		olark.configure("locale.send_button_text", YinData.translate.__("Send")), "ja" == window.YinData.lang && olark.configure("system.group", "6d77fe4b9d71ef1129929bbea08dbfa1"),
		olark("api.visitor.updateCustomFields", {
			campaign: "70150000000sU6S",
			domoId: $("#main").attr("data-domoid"),
			leadSource: "Website",
			leadSubGroup: "Chat"
		}),
		olark("api.chat.onBeginConversation",
		function() {
			s.eVar23 = $("#main").attr("data-domoid"),
			s.events = "event22",
			s.t()
		}),
		olark("api.chat.onCommandFromOperator",
		function(a) {
			"pricing" == a.command.name && olark("api.chat.sendMessageToVisitor", {
				body: "That is a great question. Our pricing really depends on the needs you have and on how many users you'd like to include. It would be best to talk over the phone. What is the best number to reach you at?"
			}),
			"support" == a.command.name && olark("api.chat.sendMessageToVisitor", {
				body: "I apologize, this is the sales department. To contact support please call: 801.805.9505"
			}),
			"partner" == a.command.name && olark("api.chat.sendMessageToVisitor", {
				body: "Our channel program is currently under reconstruction and getting fine-tuned due to the sheer amount of interest we're getting from partner verticals. The model should be up and running within the next couple of months, so it might make more sense to have a conversation when that rolls out. In the meantime, if you're looking to use Domo software internally we can have a quick chat to see if we're a good fit. What do you think?"
			}),
			"job" == a.command.name && olark("api.chat.sendMessageToVisitor", {
				body: "I'm actually not the person you'd need to talk to regarding a job, but I do know Domo is hiring. The best place I can direct you is to http://www.YinData.com/company/careers, where you can apply online. I hope this helps!"
			}),
			"demo" == a.command.name && olark("api.chat.sendMessageToVisitor", {
				body: "Sounds great, I'd love to get that set up for you. Before we go straight into a demo I'd need to ask a few questions to get a better feel for what you're looking for, how we can help, and see if we're a good fit.  Do have 5 minutes for a quick call right now? "
			}),
			"greet" == a.command.name && olark("api.chat.sendMessageToVisitor", {
				body: "Thank you for coming to our website, how can I help you today?"
			}),
			"getnumber" == a.command.name && olark("api.chat.sendMessageToVisitor", {
				body: "That is a great question. It would be easier if we could have a brief phone call to talk about it. What is the best number to reach you at?"
			})
		}),
		olark("api.chat.onOperatorsAvailable",
		function() {
			var a = !1;
			$("#olark-box-container").html($("#habla_beta_container_do_not_rely_on_div_classes_or_names")),
			$(".olark-chat").addClass("chat-available"),
			$(".olark-button").addClass("available"),
			olark("api.box.onExpand",
			function() {
				a = !0
			}),
			olark("api.box.onShrink",
			function() {
				a = !1
			}),
			$(".olark-button").on("click",
			function() {
				a ? olark("api.box.shrink") : olark("api.box.expand")
			})
		}),
		olark("api.chat.onOperatorsAway",
		function() {
			olark("api.box.hide"),
			$(".olark-chat").removeClass("chat-available"),
			$(".olark-button").removeClass("available")
		})
	}),
	olark.identify("9813-165-10-4156")
});