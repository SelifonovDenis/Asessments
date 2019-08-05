export function welcome(){
	var heightScreen = document.body.clientHeight;
	var widthScreen = document.body.clientWidth;
	//Левая часть
    webix.ui({
		id:"main",
		type:"clean",
		container:"leftPart",
		cols:[
			{
				gravity:3,
				rows:[
				{
					view:"toolbar", elements:[
						{view:"label",type:"clean", label:"Собеседования", height:40, css:"logo", align:"center", margin:0},
					],
					css:"nav"
				},
				{view:"toolbar", elements:[
						{view:"button", value:"Учёт кандидатов", id:"redirect"},
						{view:"button", value:"Учёт сотрудников", id:"redirect2"},
						{view:"button", value:"Выход", id:"out"},
						{},
						{view:"button", value:"Добавить собеседование", height:50, id:"viewAdd"},
						{view:"button", id:"addToArchive",value:"Переместить в архив", disabled:true},


					],
					css:"nav"
				},
				{
					cols:[
						{
							id:"searchPanel",
							view:"accordion",
						multi:true,
						collapsed: true,
						cols:[
							{
								gravity:1,
								header:"Поиск",
								body:{
								type:"space",	
									rows:[
										{
											view:"datepicker",
											value: "",
											format: webix.Date.dateToStr("%d.%m.%Y"),
											label: "Дата",
											id:"searchDate",
											timepicker: true,
										},
										{view:"text", id:"searchCabinet", label:"Кабинет"},
										{
											view:"combo",
											id:"searchStatus",
											label:"Статус",
											options:["","Активно","Архив"]
										},

										{height:20},
										{view:"button", id:"find", value:"Подтвердить"},
									]
								},				

							}
						]},
						{
							gravity:2.5,
							view:"datatable",
							id:"datatable",
							columns:[
								{ id:"Id",    header:"Id", width:50, sort:"int"},
								{
									id:"Date",
									header:"Дата",
									width:200,
									//format:webix.i18n.dateFormatStr,
									format: webix.Date.dateToStr("%d.%m.%Y %H:%i"),
									sort:"date"
								},
								{ id:"Cabinet",    header:"Кабинет", width:150, sort:"int"},
								{ id:"Fio", header:"Проводит",fillspace:true, minWidth:250},
								{ id:"Status", header:"Статус",fillspace:true},

							],
							select:"row",
							height: heightScreen-100	
						}
					]
				
				}
			]
			},
			{
				gravity:1,
				rows:[				
					{view:"label", label:"<img src=\"../../../public/img/logo.png\">",height:101, align:"center", css:"logotype"},	
					{
						type:"space",
						rows:[
							{view:"label", label:"Кандидаты", height:20},
							{
								view:"list",

								template:"#title#",
								select:true,
								id:"candidates"
							},
							{view:"label", label:"Проводит", height:20},
							{
								view:"list",

								template:"#title#",
								select:true,
								id:"employees"
							},

							{view:"button", id:"changeButton", value:"Изменить собеседование", disabled:true},
							{view:"button", id:"butAddCandidate",value:"Добавить кандидата", disabled:true},
							{view:"button", id:"removeCandidate", value:"Удалить кандидата", disabled:true},
							{view:"button", id:"butAddEmployee",value:"Добавить сотрудника", disabled:true},
							{view:"button", id:"removeEmployee", value:"Удалить сотрудника", disabled:true},

						],
						height:heightScreen-101
					}	
				]
			}
		]
	});

	webix.event(window, "resize", function(){
		$$("main").adjust();
	})
	//всплывающее окно "Добавить собеседование"
	webix.ui({
		view:"window",
		position:"center",
		id:"add",
		width: 500,
		modal: true,
		head:"Добавить",
		close:true,
		body:{
			type: "space",
			view: "form",
			id: "addForm",
			elements: [
                {
                    view:"datepicker",
                    value: new Date(),
                    format: webix.Date.dateToStr("%d.%m.%Y %H:%i"),
                    label: "Дата",
                    name:"addDate",
                    id:"addDate",
                    labelPosition:"top",
					timepicker: true,
                },
				{view:"text", name:"addCabinet", id:"addCabinet", label:"Кабинет", labelPosition:"top"},
				{height:20},
				{view:"button", id:"addAssessment", value:"Добавить Собеседование"},
			],
			rules: {
				"addDate": webix.rules.isNotEmpty,
				"addCabinet": webix.rules.isNotEmpty,
			}
		}
	}).hide();

	webix.Date.startOnMonday = true;
	webix.i18n.setLocale("ru-RU")
	//всплывающее окно "изменить"
	webix.ui({
		view:"window",
		id:"changeWindow",
		position:"center",
		width: 500,
		modal: true,
		head:"Изменить",
		close:true,
		body:{
			type: "space",
			view: "form",
			id: "changeForm",
			elements: [
                {
                    view:"datepicker",
                    value: new Date(),
                    format: webix.Date.dateToStr("%d.%m.%Y %H:%i"),
                    label: "Дата",
                    name:"changeDate",
                    id:"changeDate",
                    labelPosition:"top",
					timepicker: true
                },

				{view:"text", name:"changeCabinet", id:"changeCabinet", label:"Кабинет", labelPosition:"top"},
                {
                    view:"combo",
                    label: 'Статус',
                    name:"changeStatus",
                    id:"changeStatus",
                    labelPosition:"top",
                    options:["Активно","Архив"],
                },
				{height:20},
				{view:"button", id:"saveChange", value:"Сохранить изменения"},
			],
			rules: {
				"changeDate": webix.rules.isNotEmpty,
				"changeCabinet": webix.rules.isNotEmpty,
                "changeStatus": webix.rules.isNotEmpty,
			}
		}
	}).hide();


    webix.ui({
        view:"window",
        position:"center",
        id:"CandidateWindow",
        width: 500,
        modal: true,
        head:"Добавить",
        close:true,
        body:{
            type:"space",
            rows:[
                {
                    view:"datatable",
                    id:"CandidatesTable",
                    columns:[
                        { id:"Id",    header:"Id", width:30},
                        { id:"First_name",  header:"Фамилия",fillspace:true},
                        { id:"Last_name", header:"Имя",fillspace:true},
                        { id:"Middle_name", header:"Отчество",fillspace:true},
                    ],
                    select:"row",
                    height: 400,
                },
                {view:"button",id:"AddCandidate", value:"Добавить кандидата"},
            ]
        }
    }).hide();

	webix.ui({
		view:"window",
		position:"center",
		id:"EmployeeWindow",
		width: 500,
		modal: true,
		head:"Добавить",
		close:true,
		body:{
			type:"space",
			rows:[
				{
					view:"datatable",
					id:"EmployeesTable",
					columns:[
						{ id:"Id",    header:"Id", width:30},
						{ id:"First_name",  header:"Фамилия",fillspace:true},
						{ id:"Last_name", header:"Имя",fillspace:true},
						{ id:"Middle_name", header:"Отчество",fillspace:true},
					],
					select:"row",
					height: 400,
				},
				{view:"button",id:"AddEmployee", value:"Добавить сотрудника"},
			]
		}
	}).hide();
}






	



