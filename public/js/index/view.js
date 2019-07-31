export function welcome(){
	var heightScreen = document.body.clientHeight;
	var widthScreen = document.body.clientWidth;
    webix.ui({
		type:"clean",
		container:"leftPart",
		id:"left",
		 rows:[
				{
					view:"toolbar", elements:[

						{view:"label",type:"clean", label:"Учёт кандидатов", height:40, css:"logo", align:"center", margin:0},
					],
					css:"nav"
				},
					{view:"toolbar", elements:[
						{view:"button", id:"getTable", value:"Кандидаты"},
						{view:"button", value:"Добавить кандидата", height:50, id:"viewAdd"},
						{view:"button", id:"archive", value:"Архив"},
							{view:"button", value:"Учёт сотрудников", id:"redirect"},
							{view:"button", value:"Собеседования", id:"redirect2"},
							{view:"button", value:"Выход", id:"out"},

					],
					css:"nav"
				},
				{
					cols:[
						{view:"accordion",
						multi:true,
						collapsed: true,
						cols:[ //or rows
							{
								header:"Поиск",
								body:{
								type:"space",
									rows:[
											{view:"text", id:"searchFamily", label:"Фамилия"},
											{view:"text", id:"searchName", label:"Имя"},
											{view:"text", id:"searchSubname", label:"Отчество"},
											{view:"text", id:"searchPhone", label:"Телефон"},
											{view:"text", id:"searchEmail", label:"Почта"},
											{view:"text", id:"searchStatus", label:"Статус"},
											{view:"text", id:"searchDate", label:"Дата собеседования", labelWidth: 150},
											{height:20},
											{view:"button", value:"Найти"},
										]
								},
							width: widthScreen*0.2
							}
						]},
						{
							view:"datatable",
							id:"datatable",
							columns:[

								{ id:"Id",    header:"Id", width:30},
								{ id:"First_name",  header:"Фамилия",fillspace:true},
								{ id:"Last_name", header:"Имя",fillspace:true},
								{ id:"Middle_name", header:"Отчество",fillspace:true},
								{ id:"Status", header:"Статус", width:250},
								{
									id:"Asessment",
									header:"Дата собеседования",
									template: function(candidate){

										return candidate.Asessment.Date
									},
									width:200
								}
							],
							select:"row",
							height: heightScreen-100
						}
					]

				}
			]


	});

	webix.ui({
		type: "clean",
		container: "rightPart",
		id:"right",
		rows:[
			{view:"label", label:"<img src=\"../../../public/img/logo.png\">",height:99, align:"center", css:"logotype"},
			{
				type:"space",
				rows:[
					{
						type:"space",
						view:"form",
						id:"changeForm",
						elements:[
							{view:"text",name:"cfirstName", id:"changeFirstName", label:"Фамилия"},
							{view:"text",name:"clastName",  id:"changeLastName", label:"Имя"},
							{view:"text",name:"cmiddleName", id:"changeMiddleName", label:"Отчество"},
							{view:"text",name:"cphone",  id:"changePhone", label:"Телефон"},
							{view:"text",name:"cemail",  id:"changeEmail", label:"Почта"},
							{
								view:"combo",
								id:"changeStatus",
								label: 'Статус',
								options:["Ожидаем ответа","Назначено собеседование", "Принят на стажировку", "Отправлен оффер", "Не принят на стажировку", "Удален из собеседования","Архив"]
							},
							{view:"text", id:"changeDate", label:"Дата собеседования", labelWidth: 150, readonly:true},
						],
						rules:{
							"cfirstName":webix.rules.isNotEmpty,
							"clastName":webix.rules.isNotEmpty,
							"cmiddleName":webix.rules.isNotEmpty,
							"cphone":webix.rules.isNotEmpty,
							"cemail":webix.rules.isEmail,
						}
					},

					{view:"button", id:"saveChange", value:"Сохранить изменения", disabled:true},
					{view:"button",id:"butAddDate", value:"Назначить дату собеседования", disabled:true},
					{view:"button", id:"butRelocateArchive", value:"Переместить в архив", disabled:true},
					{view:"label", label:"Собеседование пройдено", align:"center"},
					{
						cols:[
							{view:"button", id:"successfully", value:"Успешно", disabled:true},
							{view:"button",id:"notSuccessfully", value:"Не успешно", disabled:true}
						]
					}

				],
				height:heightScreen-101
			}
		]
	});


	webix.event(window, "resize", function(){
		$$("left").adjust();
		$$("right").adjust();
	})


	//Окно назначить дату
	webix.ui({
		view:"window",
		position:"center",
		id:"DateWindow",
		width: 500,
		modal: true,
		head:"Добавить",
		close:true,
		body:{
			type:"space",
			rows:[
				{
					view:"datatable",
					id:"Date",
					columns:[
						{ id:"Id",    header:"Id", width:30},
						{ id:"Date",  header:"Дата",fillspace:true},
						{ id:"Cabinet", header:"Кабинет",fillspace:true},
					],
					select:"row",
					height: 400
				},
				{view:"button",id:"UpdateIdAsessment", value:"Назначить дату собеседования"},
				{view:"button", id:"AddIdAsessment", value:"Назначить дату собеседования"},
			]
		}
	}).hide();


	//всплывающее окно "Добавить кандидата"
	webix.ui({
		view:"window",
		position:"center",
		id:"add",
		width: 500,
		modal: true,
		close:true,
		head:"Добавить",
		body:{
			view:"form",
			id:"addForm",
			type:"space",
			rows:[
				{view:"text", name:"firstName", id:"addFirstName", label:"Фамилия"},
				{view:"text", name:"lastName", id:"addLastName", label:"Имя"},
				{view:"text", name:"middleName", id:"addMiddleName", label:"Отчество"},
				{view:"text", name:"phone", id:"addPhone", label:"Телефон"},
				{view:"text", name:"email", id:"addEmail", label:"Почта"},
				{
					view:"combo",
					label: 'Статус',
					name:"status",
					id:"addStatus",
					options:["Ожидаем ответа","Назначено собеседование", "Принят на стажировку", "Отправлен оффер", "Не принят на стажировку"]
				},
				{height:20},
				{view:"button", id:"AddDateAsessment", value:"Назначить дату собеседования"},
				{view:"button", id:"addCandidat", value:"Добавить кандидата"},
			],
			rules:{
				"firstName":webix.rules.isNotEmpty,
				"lastName":webix.rules.isNotEmpty,
				"middleName":webix.rules.isNotEmpty,
				"phone":webix.rules.isNotEmpty,
				"email":webix.rules.isEmail,
				"status":webix.rules.isNotEmpty,
			}
		}
	}).hide();
}