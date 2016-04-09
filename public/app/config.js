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
            "Signin": "Signin",
            "New_Jobs": "New Jobs",
            'Jobs_Title': "Jobs Title",
            "Employer": {
                "Employer": "Employer",
                "EmployerName": "Name",
                "EmployerType": "Type",
                "NumberOfEmployees": "Number Of Employees",
                "AverageNumberOfJobOpeningsPerMonth": "Average Number Of Job Openings Per Month",
                "ContactFirstName": "Contact First Name",
                "ContactLastName": "Contact Last Name",
                "ContactTitle": "Contact Title",
                "ContactMobileNumber": "Contact Mobile Number"
            },
            "User": {
                "UserName": "User Name",
                "FirstName": "First Name",
                "LastName": "Last Name",
                "UserType": "User Type"

            },
            "Buttons": {
                "Update": "Update",
                "Save": "Save",
                "Cancel": "Cancel",
                "Delete": "Delete",
                "Add": "Add New"
            },
            "Menu": {
                "SubTitle": "Jobs IN Egypt",
                "Home": "Home",
                "Jobs": "Jobs",
                "Employers": "Employers",
                "Vacancies": "Vacancies"
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
            "Sign Up": "فتح حساب",
            "Job Seeker": "باحث عن وظيفة",
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
                "AverageNumberOfJobOpeningsPerMonth": "متوسط عدد الوظائف المفتوحة كل شهر",
                "ContactFirstName": "الاسم الأول",
                "ContactLastName": "الاسم الأخير",
                "ContactTitle": "الوظيفة",
                "ContactMobileNumber": "رقم التليفون"
            },
            "User": {
                "UserName": "اسم المستخدم",
                "FirstName": "الاسم الأول",
                "LastName": "الاسم الأخير",
                "UserType": "نوع المستخدم"

            },
            "Buttons": {
                "Update": "تعديل",
                "Save": "حفظ",
                "Cancel": "الغاء",
                "Delete": "حذف",
                "Add": "اضافة جديد"
            },
            "Menu": {
                "SubTitle": "وظائف فى مصر",
                "Home": "الرئيسية",
                "Jobs": "الوظائف",
                "Employers": "الشركات",
                "Vacancies": "فرص العمل"
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
