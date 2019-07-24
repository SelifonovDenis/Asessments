export function welcome(){
	var heightScreen = document.body.clientHeight;
	var widthScreen = document.body.clientWidth;
    webix.ui({
		type:"clean",
		container:"leftPart",
		cols:[
			{ rows:[
				{
					view:"toolbar", elements:[

						{view:"label",type:"clean", label:"Учёт кандидатов", height:40, css:"logo", align:"center", margin:0},
					],
					css:"nav"
				},
					{view:"toolbar", elements:[
						{view:"button", id:"getTable", value:"Кандидаты"},
						{view:"button", value:"Добавить кандидата", height:50, id:"viewAdd"},
						{view:"button", value:"Архив"},
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
							{ header:"Поиск", body:{
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
			], width: widthScreen*0.75},
			{
				rows:[				
					{view:"label", label:"<img src=\"../../../public/img/logo.png\">",height:101, align:"center", css:"logotype"},	
					{
						type:"space",
						rows:[
							{view:"text", id:"rfamily", label:"Фамилия", readonly:true},
							{view:"text", id:"rname", label:"Имя", readonly:true},
							{view:"text", id:"rsubname", label:"Отчество", readonly:true},
							{view:"text", id:"rphone", label:"Телефон", readonly:true},
							{view:"text", id:"remail", label:"Почта", readonly:true},
							{view:"text", id:"rstatus", label:"Статус", readonly:true},
							{view:"text", id:"rdate", label:"Дата собеседования", labelWidth: 150, readonly:true},
							{view:"button", id:"changeButton", value:"Изменить", disabled:true},
							{view:"button",id:"butAddDate", value:"Назначить дату собеседования", disabled:true},
							{view:"button", id:"butRelocateArchive", value:"Переместить в архив", disabled:true},
							{view:"label", label:"Собеседование пройдено", align:"center"},
							{
								cols:[
									{view:"button", value:"Успешно"},
									{view:"button", value:"Не успешно"}
								]
							}

						],
						height:heightScreen-101
					}	
				]
			}
		]
	});


	//всплывающее окно "изменить"
	webix.ui({
		view:"window",
		id:"changeWindow",
		position:"center",
		width: 500,
		modal: true,
		type:"space",
		head:"Изменить",
		close:true,
		body:{
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
					value:"",
					label: 'Статус',
					options:["Ожидаем ответа","Назначено собеседование", "Принят на стажировку", "Отправлен оффер", "Не принят на стажировку"]
				},
				{view:"text", id:"changeDate", label:"Дата собеседования", labelWidth: 150},
				{height:20},
				{view:"button", value:"Назначить дату собеседования"},
				{view:"button", id:"saveChange", value:"Сохранить изменения"},
			],
			rules:{
				"cfirstName":webix.rules.isNotEmpty,
				"clastName":webix.rules.isNotEmpty,
				"cmiddleName":webix.rules.isNotEmpty,
				"cphone":webix.rules.isNotEmpty,
				"cemail":webix.rules.isEmail,
				"changeStatus":webix.rules.isNotEmpty,
			}
		}
	}).hide();

	webix.Date.startOnMonday = true;
	//добаить дату
	webix.ui({
		view:"window",
		position:"center",
		id:"addDate",
		width: 500,

		modal: true,
		head:"Добавить",
		close:true,
		body:{
			type:"space",
			rows:[
				{
					view:"calendar",
					id:"my_calendar",
					date:new Date(),
					weekHeader:true,
					events:webix.Date.isHoliday,
					width:300,
					height:250
				},
				{height:20},
				{view:"button", value:"Добавить дату"},
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
		head:"Добавить",
		close:true,

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
				{view:"text", id:"addDate", label:"Дата собеседования", labelWidth: 150},
				{height:20},
				{view:"button", value:"Назначить дату собеседования"},
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





	
