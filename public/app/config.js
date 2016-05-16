(function () {
    'use strict';
    
    var core = angular.module('app');
    
    var config = {
        appErrorPrefix: '[hot-towel Error] ',
        appTitle: 'hot-towel'
    };
    
    core.value('config', config);
    
    core.config(configure);
    
    configure.$inject = ['$translateProvider'];
    /* @ngInject */
    function configure($translateProvider) {
        
        var english = {
            'Title': 'Internationalization Test',
            "Language": "Language",
            "Languages": {
                "English": "English",
                "French": "French",
                "Arabic": "عربى"
            },
            "Created_By": "Created by John Papa",
            "Forget Password": "Forget Password",
            "First_Name": "First Name",
            "Last_Name": "Last Name",
            "Age": "Age",
            "Location": "Location",
            "Messages": "Messages",
            "People": "People", 
            "Splash_Msg": "Loading . . .",
            "Message_Count": "{messageCount, plural, =0{No Messages} one{1 Message} other{# Messages}}",
            "Conference_Date": "May 18 - 19, 2015",
            "Dashboard": "Dashboard",
            "Admin": "Admin",
            "Greeting": "{{name}} is logged in",
            "Admin_Message": "The quick brown fox jumped over the lazy dog",
            "Activation_Dash": "Activated Dashboard View",
            "Activation_Admin": "Activated Admin View",
            "Featured_Jobs": "Featured Jobs",
            "Welcome": "Welcome To Empower !",
            "Signin": "Sign In",
            "New_Jobs": "New Jobs",
            'Jobs_Title': "Jobs Title",
            "Employer": {
                "Employer": "Employer",
                "EmployerName": "Name",
                "EmployerType": "Type",
                "NumberOfEmployees": "Employees",
                "AverageNumberOfJobOpeningsPerMonth": "Jobs Per Month",
                "ContactFirstName": "Contact First Name",
                "ContactLastName": "Contact Last Name",
                "ContactTitle": "Contact Title",
                "ContactMobileNumber": "Contact Mobile Number",
                "ContactPersonInformation": "Contact Person Information",
                "CompanyPhone": "CompanyPhone",
                "CompanyWebsite": "Company Website",
                "CompanySize": "Company Size",
                "Country": "Country"
            },
            "JobSeeker": {
                "JobSeeker": "JobSeeker",
                "Gender": "Gender",
                "BirthDate": "Birth Date",
                "Address": "Address",
                "ResumeLink": "Resume Link",
                "ExperienceLevel": "Experience Years",
                "MostRecentEmployer": "Most Recent Employer",
                "MostRecentJobTitle": "Most Recent Job Title",
                "JobCategory": "JobCategory",
                "PreferredJobCategory": "PreferredJobCategory",
                "EducationLevel": "Education Level",
                "SchoolName": "School Name",
                "GraduationGrade": "GraduationGrade",
                "LanguageSpoken": "Language Spoken",
                "SalaryPreference": "Salary Preference",
                "PreferredWork": "PreferredWork",
                "Reference1": "Reference1",
                "Reference1Contact": "Reference1 Contact",
                "Reference2": "Reference2",
                "Reference2Contact": "Reference2 Contact",
                'Personal Information': 'Personal Information',
                'Educational Information': 'Educational',
                'Contact Information': 'Contact Information',
                "Country": "Country",
                "MobileNo": "MobileNo",
                "Email": "Email",
                "Experiances" : "Experiances",
                'FirstName': 'First Name',
                'MiddleName': 'Middle Name',
                'LastName': 'Last Name',
                'FullName': 'Full Name',
                'MaritalStatus': 'Marital Status',
                'MilitaryStatus': 'Military Status',
                'CarLicenceType': 'Car Licence Type',
                'FacebookAcount': 'Facebook Acount',
                'TwitterAcount': 'Twitter Acount',
                'LinkedinAccount': 'Linkedin Account',
                'Course': 'Course',
                'Skills': 'Skills',
                'LanguageSkills': 'Language Skills',
                'HasACar':'Has a Car',
                'ExpectedSalary': 'Expected Salary',
                'PeriodOfEnrollment': 'Period Of Enrollment',
                'MoreInformation': 'More Information',
                'Job Preferences': 'Job Preferences'
            },
            "Vacancy": {
                "JobTitle": "Job Title",
                "JobDescrption": "Job Descrption",
                "AvailableFrom": "Available From",
                "AvailableTo": "Available To" ,
                "SalaryRangeFrom": "Salary Range From",
                "SalaryRangeTo": "Salary Range To",
                "SalaryCurancy": "Salary Curancy",
                "RequiredExperiance": "Required Experience",
                "JobType" : "Job Type",
                "Industry": "Industry",
                "Country": "Country",
                "City": "City"
            },
            "User": {
                "UserName": "User Name",
                "FirstName": "First Name",
                "LastName": "Last Name",
                "UserType": "User Type",
                "CreatedBy": "Created By",
                "ModifiedBy": "Modified By"
            },
            "Industry": {
                "Description": "Description"
            },
            "JobType": {
                "JobTypeName": "Job Type Name"
            },
            "JobRole": {
                "JobRoleName": "Job Role Name"
            },
            "Address": {
                "Country": "Country",
                "City": "City",
                "Area": "Area",
                "AddressLine1": "Address Line1",
                "AddressLine2": "Address Line2"
            },
            "Experiance": {
                "Country": "Country",
                "Company": "Company",
                "CompanySize": "Company Size",
                "CompanyType": "Company Type",
                "Position": "Position",
                "Salary": "Salary",
                "PeriodFrom": "Period From",
                "PeriodTo": "Period To",
                "Achievements": "Achievements",
                "FunctionalTasks": "Functional Tasks"
            },
            "LanguageSkill": {
                "Language": "Language",
                "LanguageLevel": "LanguageLevel"
                
            },
            "Skill": {
                "SkillType": "SkillType",
                "SkillLevel": "SkillLevel"
            },
            "Category": {
                "Description": "Description"
            },
            "InnerPage": {
                "PageTitle": "Page Title",
                "PageBody": "Page Body"
            }, 
            "EducationalInformation": {
                'EducationType': 'Education Type',
                'Univirsty': 'Univirsty',
                'Faculty': 'Faculty',
                'Specialization': 'Specialization',
                'Grade': 'Grade'
            },
            'Course': {
                'Title': 'Title',
                'TrainingCenter': 'Training Center',
                'Specialization': 'Specialization',               
                'Grade': 'Grade',
                'CourseYear': 'CourseYear'
            },
            "Buttons": {
                "Update": "Update",
                "Save": "Save",
                "Cancel": "Cancel",
                "Delete": "Delete",
                "Add": "Add New",
                "NewAddress": "New Address",
                "Change Password": "Change Password",
                "Reset Password": "Reset Password",
                'Previous': 'Previous',
                'Next': 'Next',
                'First': 'First',
                'Last': 'Last'
            },
            "Menu": {
                "SubTitle": "Jobs IN Egypt",
                "Home": "Home",
                "Jobs": "Jobs",
                "Employers": "Employers",
                "Vacancies": "Vacancies",
                "ContactUs": "Contact US",
                "AboutUs": "About US",
                "MyProfile": "User Profile" ,
                "Users" : "Users",
                "Industries" : "Industries",
                "JobTypes" : "Job Types",
                "JobRoles" : "Job Roles",
                "InnerPages" : "Inner Pages" ,
                "JobSeekers" : "Job Seekers",
                "Signout" : "Sign Out",
                "UserMenu": "User Menu",
                "Categories": "Categories",
                "CompanyProfile" : "Company Profile",
                "Experiances" : "Experiances",
                'SelectValue': 'Select Value',
                'JobSeekerProfile': 'Job Seeker Profile'
            },
            "Footer": {
                "Copy": " \u00A9 2016 Empower Corp International Ltd."
            }
        };

        var arabic = {
            "Title": "أختبار ",
            "Language": "اللغات",
            "Languages": {
                "English": "English",
                "French": "French",
                "Arabic": "عربى"
            },
            "Email": "البريد الالكتروني",
            "Password": "كلمة السر",
            "Remember Me": "تذكرني",
            "Forget Password": "نسيت كلمة السر",
            "Confirm Password": "تاكيد كلمة السر",
            "Sign Up": "فتح حساب",
            "Created_By": "اضيف بواسطة",
            "First_Name": "الاسم الاول",
            "Last_Name": "الاسم الثانى",
            "Age": "العمر",
            "Location": "الموقع",
            "Messages": "الرسائل",
            "People": "الاشخاص",
            "Splash_Msg": "تحميل . . .",
            "Message_Count": "{messageCount, plural, =0{No Messages} one{1 Message} other{# Messages}}",
            "Conference_Date": "May 18 - 19, 2015",
            "Dashboard": "Dashboard",
            "Admin": "Admin",
            "Greeting": "{{name}} is logged in",
            "Admin_Message": "The quick brown fox jumped over the lazy dog",
            "Activation_Dash": "Activated Dashboard View",
            "Activation_Admin": "Activated Admin View",
            "Featured_Jobs": "الوظائف المفضلة",
            "Welcome": "مرحبا بكم فى Empower",
            "Signin": "تسجيل الدخول",
            "New_Jobs": "الوظائف الجديده",
            "Jobs_Title": "عنوان الوظيف",
            "Employer": {
                "Employer": "معلن عن وظيفة",
                "EmployerName": "اسم الشركة",
                "EmployerType": "نوع الشركة",
                "NumberOfEmployees": "عدد الموظفين",
                "AverageNumberOfJobOpeningsPerMonth": " عدد الوظائف شهريا",
                "ContactFirstName": "الاسم الأول",
                "ContactLastName": "الاسم الأخير",
                "ContactTitle": "الوظيفة",
                "ContactMobileNumber": "رقم التليفون",
                "ContactPersonInformation": "بيانات المسئول",
                "CompanyPhone": "تليفون الشركة",
                "CompanyWebsite": "الموقع الاليكترونى",
                "CompanySize": "عدد الموظفين",
                "Country": "الدولة"
            },
            "JobSeeker": {
                "JobSeeker": "باحث عن وظيفة",
                "Gender": "النوع",
                "BirthDate": "تاريخ الميلاد",
                "Address": "العنوان",
                "ResumeLink": "السيرة الذاتية",
                "ExperienceLevel": "سنوات الخبرة",
                "MostRecentEmployer": "الشركة الحالية",
                "MostRecentJobTitle": "المسمي الوظيفي الحالي",
                "JobCategory": "فئة الوظيفة",
                "PreferredJobCategory": "فئة الوظيفة المفضلة",
                "EducationLevel": "مستوي التعليم",
                "SchoolName": "اسم المدرسة او الجامعة",
                "GraduationGrade": "درجة التخرج",
                "LanguageSpoken": "اللغات",
                "SalaryPreference": "المرتب المفضل",
                "PreferredWork": "نوع العمل",
                "Reference1": "Reference1",
                "Reference1Contact": "Reference1 Contact",
                "Reference2": "Reference2",
                "Reference2Contact": "Reference2 Contact",
                'Personal Information': 'المعلومات الشخصية',
                'Educational Information': 'المعلومات الدراسية',
                'Contact Information': 'معلومات الاتصال',
                "MobileNo": "رقم المبيل",
                "Email": "البريد الألكتروني",
                "Experiances": "الخبرات",
                'FirstName': 'الاسم الاول',
                'MiddleName': 'الاسم الاوسط',
                'LastName': 'الاسم الاخير',
                'FullName': 'الاسم',
                'MaritalStatus': 'الحالة الاجتماعية',
                'MilitaryStatus': 'موقف من التجنيد',
                'CarLicenceType': 'نوع رخصة السيارة',
                'FacebookAcount': 'حساب الفيسبوك',
                'TwitterAcount': 'حساب التويتر',
                'LinkedinAccount': 'حساب لينكدان',
                'Course': 'الدورات',
                'Skills': 'المهارات',
                'LanguageSkills': 'مهارات اللغة',
                'HasACar': 'لديك سيارة',
                'ExpectedSalary': 'المرتب المتوقع',
                'PeriodOfEnrollment': 'مهلة ترك الشركة الحالية',
                'MoreInformation': 'معلومات اضافية',
                'Job Preferences':'خيارات الوظيفة'
    },
            "Vacancy": {
                "JobTitle": "عنوان الوظيفة",
                "JobDescrption": "وصف الوظيفة",
                "AvailableFrom": "متاحة من",
                "AvailableTo": "متاحة الى" ,
                "SalaryRangeFrom": "المرتب من ",
                "SalaryRangeTo": "المرتب الى",
                "SalaryCurancy": "عملة المرتب",
                "RequiredExperiance": "الخبرة المطلوبة",
                "JobType" : "نوع الوظيفة",
                "JobRole" : "مجال الوظيفة",
                "Industry": "قطاع العمل",
                "Country": "الدولة",
                "City": "المدينة"
            },
            "LanguageSkill": {
                "Language": "اللغة",
                "LanguageLevel": "مستوى اللغة"
                
            },
            "Skill": {
                "SkillType": "نوع المهارة",
                "SkillLevel": "مستوى المهارة"
            },
            "User": {
                "UserName": "اسم المستخدم",
                "FirstName": "الاسم الأول",
                "LastName": "الاسم الأخير",
                "UserType": "نوع المستخدم",                
                "CreatedBy": "سجل بواسطة",
                "ModifiedBy": "عدل بواسطة"
            },
            "Industry": {
                "Description": "الوصف"
            },
            "JobType": {
                "JobTypeName": "نوع الوظيفة"
            },
            "JobRole": {
                "JobRoleName": "نوع المجال"
            },
            "Address": {
                "Country": "دولة",
                "City": "مدينة",
                "Area": "منطقة",
                "AddressLine1": "العنوان الأول",
                "AddressLine2": "العنوان الثاني"
            },
            "Experiance": {
                "Country": "الدولة",
                "Company": "الشركة",
                "CompanySize": "حجم الشركة",
                "CompanyType": "نوع الشركة",
                "Position": "الوظيفة",
                "Salary": "المرتب",
                "PeriodFrom": "الفتره من ",
                "PeriodTo": "الفتره الى",
                "Achievements": "الانجازات",
                "FunctionalTasks": "المهام"
            },
            "Category": {
                "Description": "الوصف"
            },
            "InnerPage": {
                "PageTitle": "عنوان الصفحة",
                "PageBody": "تفاصيل الصفحة"
            },
            'EducationalInformation': {
                'EducationType': 'المرحلة التعليمية',
                'Univirsty': 'الجامعة',
                'Faculty': 'الكلية',
                'Specialization': 'التخصص',
                'Grade': 'التقدير'
            },
            'Course': {
                'Title': 'اسم الدورة',
                'TrainingCenter': 'مركز التدريب',
                'Specialization': 'التخصص',               
                'Grade': 'التقدير',
                'CourseYear': 'السنة'
            },
            "Buttons": {
                "Update": "تعديل",
                "Save": "حفظ",
                "Cancel": "الغاء",
                "Delete": "حذف",
                "Add": "اضافة جديد",
                "NewAddress": "عنوان جديد",
                "Change Password": "تغيير كلمة السر",
                "Reset Password": "ارسال ميل",
                'Previous': 'السابق',
                'Next': 'التالي',
                'First': 'الاول',
                'Last': 'الاخير'
            },
            "Menu": {
                "SubTitle": "وظائف فى مصر",
                "Home": "الرئيسية",
                "Jobs": "الوظائف",
                "Employers": "الشركات",
                "Vacancies": "فرص العمل",
                "ContactUs": "اتصل بنا",
                "AboutUs": "عنا",
                "MyProfile": "بيانات المستخدم" ,
                "Users" : "المستخدمين" ,
                "Industries" : "قطاعات العمل",
                "JobTypes" : "انواع الوظائف",
                "JobRoles" : "مجالات الوظائف",
                "InnerPages" : "الصفحات الداخلية",
                "JobSeekers" : "الباحثين عن العمل",
                "Signout" : "تسجيل الخروج",
                "UserMenu": "قائمة المستخدم",
                "Categories": "التصنيفات",
                "CompanyProfile" : "بيانات الشركة",
                "Experiances" : "الخبرات",
                'SelectValue': 'اختار من القائمة',
                'JobSeekerProfile': 'بيانات طالب العمل'
            },
            "Footer": {
                "Copy": "\u00A9" + " شركة ايم باور 2016"
            }
        };
        
        var french = {
            "Title": "أختبار ",
            "Language": "اللغات",
            "Languages": {
                "English": "English",
                "French": "Fr",
                "Arabic": "عربى"
            },
            "Created_By": "اضيف بواسطة",
            "First_Name": "الاسم الاول",
            "Last_Name": "الاسم الثانى",
            "Age": "العمر",
            "Location": "الموقع",
            "Messages": "الرسائل",
            "People": "الاشخاص",
            "Splash_Msg": "تحميل . . .",
            "Message_Count": "{messageCount, plural, =0{No Messages} one{1 Message} other{# Messages}}",
            "Conference_Date": "May 18 - 19, 2015",
            "Dashboard": "Dashboard",
            "Admin": "Admin",
            "Greeting": "{{name}} is logged in",
            "Admin_Message": "The quick brown fox jumped over the lazy dog",
            "Activation_Dash": "Activated Dashboard View",
            "Activation_Admin": "Activated Admin View",
            "Featured_Jobs": "الوظائف المفضلة",
            "Welcome": "مرحبا بكم فى Empower",
            "Signin": "تسجيل الدخول",
            "New_Jobs": " فرنساوى الوظائف الجديده",
            "Jobs_Title": "Jobs Title"
        };
        
        $translateProvider.translations('en', english);
        $translateProvider.translations('ar', arabic);
        $translateProvider.translations('fr', french);
        $translateProvider.registerAvailableLanguageKeys(['en', 'ar', 'fr'], {
            'en-US': 'en',
            'ar-EG': 'ar',
            'fr-FR': 'fr'
        });
        $translateProvider.preferredLanguage('ar');
        //$translateProvider.determinePreferredLanguage();
        
        $translateProvider.useCookieStorage();
        $translateProvider.useLocalStorage();
        
        console.log(navigator.language);

    }
    
    core.run(function ($rootScope) {
        $rootScope.$on('$translateChangeSuccess', function () {
            console.log('Translation Change Success!');
        });
        $rootScope.$on('$translateChangeError', function () {
            console.log('Translation Change Error!');
        });
    });

})();
