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
            "FacebookSignin": "Facebook SignUp/Login",
            "GoogleSignin": "Google SignUp/Login",
            "Agreement": "I agree with the Terms of use",
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
                "Country": "Country",
                "Photo": "Photo"

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
                "Experiances": "Experiances",
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
                'HasACar': 'Has a Car',
                'PeriodOfEnrollment': 'Period Of Enrollment',
                'MoreInformation': 'More Information',
                'Job Preferences': 'Job Preferences'
            },
            "Vacancy": {
                "Vacancy": "Vacancy",
                "JobTitle": "Job Title",
                "JobDescrption": "Job Descrption",
                "AvailableFrom": "Available From",
                "AvailableTo": "Available To",
                "SalaryRangeFrom": "Salary From",
                "SalaryRangeTo": "To",
                "SalaryCurancy": "Curancy",
                "RequiredExperiance": "Required Experience",
                "JobType": "Job Type",
                "Industry": "Industry",
                "Country": "Country",
                "City": "City",
                'EducationalLevel': 'Educational Level',
                'CareerLevel': 'Career Level',
                'HotJobFlag': 'Hot Job Flag',
                'Area': 'Area',
                'JobRole': 'Job Role',
                'JobRequirements': 'Requirements',
                'Benfits': 'Benfits',
                'HideSalary': 'Hide Salary',
                'ReciveApplicationsByEmail': 'Recive Applications By Email',
                'HideCompany': 'Hide Company',
                'SendRecommendedCandidatesDailyOrWeekly': 'Send Recommended Candidates Daily Or Weekly'

            },
            'City': {
                "City": "City",
                "Name": "Name",
                "Country": "Country",
                "Confirmed": "Confirmed"
            },
            'Area': {
                "Area": "Area",
                "City": "City",
                "Name": "Name",
                "Confirmed": "Confirmed"
            },
            "User": {
                "UserName": "User Name",
                "FirstName": "First Name",
                "LastName": "Last Name",
                "UserType": "User Type",
                "CreatedBy": "Created By",
                "ModifiedBy": "Modified By",
                "Package": "Package",
                'Features': 'Features'
            },
            "Industry": {
                "Name": "Name"
            },
            "Specialization": {
                "Name": "Name"
            },
            "Faculty": {
                "Name": "Name"
            },
            "Univirstynivirsty": {
                "Name": "Name"
            },
            "JobType": {
                "Name": "Name"
            },
            "JobRole": {
                "Name": "Name"
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
                'EducationalLevel': 'Educational Level',
                'Univirsty': 'Univirsty',
                'Faculty': 'Faculty',
                'Specialization': 'Specialization',
                'Grade': 'Grade'
            }, "EducationalLevel": {
                "Name": "Name"
            },
            'Course': {
                'Title': 'Title',
                'TrainingCenter': 'Training Center',
                'Specialization': 'Specialization',
                'Grade': 'Grade',
                'CourseYear': 'CourseYear'
            },
            'Main': {
                'Empower': 'Empower',
                'Welcome': 'Welcome to the Empower!',
                'Search1': 'FIND THE BEST',
                'Search2': 'JOBS IN EGYPT',
                'Search3': 'Search Jobs (e.g. Sales in Cairo)',
                'Messge1': '1.Register an account to start',
                'Messge2': '2. Specify & search your desired job',
                'Messge3': '3. Send your resume to employers'
            },
            "Buttons": {
                "ArrangeInterview":"Arrange Interview",
                "Update": "Update",
                "Save": "Save",
                "Cancel": "Cancel",
                "Delete": "Delete",
                "Add": "Add New",
                "Select": "Select",
                "Apply": "Apply",
                "Search": "Search",
                "NewAddress": "New Address",
                "Change Password": "Change Password",
                "Reset Password": "Reset Password",
                'Previous': 'Previous',
                'Next': 'Next',
                'First': 'First',
                'Last': 'Last',
                'Finish': 'Finish',
                "Accept": "Accept",
                "Reject": "Decline",
                "Rollback": "Rollback",
                "ShortList": "ShortList",
                "Approve": "Approve"
            },
            "Menu": {
                "SubTitle": "Jobs IN Egypt",
                "Home": "Home",
                "Jobs": "Jobs",
                "Employers": "Employers",
                "Vacancies": "Vacancies",
                "ContactUs": "Contact US",
                "AboutUs": "About US",
                "MyProfile": "User Profile",
                "SearchJobs": "Search Jobs",
                "Users": "Users",
                "Industries": "Industries",
                "JobTypes": "Job Types",
                "JobRoles": "Job Roles",
                "InnerPages": "Inner Pages",
                "JobSeekers": "Job Seekers",
                "Signout": "Sign Out",
                "PostJob": "Post Job",
                "UserMenu": "User Menu",
                "EducationalLevels": "Educational Levels",
                "Categories": "Categories",
                "CompanyProfile": "Company Profile",
                "InviteSubUser": "Invite Sub User",
                "SignUpSubUser": "SignUpSubUser",
                "subUserFeatures": "SubUserFeatures",
                "Experiances": "Experiances",
                'SelectValue': 'Select Value',
                'JobSeekerProfile': 'Job Seeker Profile',
                'Cities': 'Cities',
                'CitiesNotConfirmed': 'Cities Not Confirmed',
                'Areas': 'Areas',
                'AreasNotConfirmed': 'Areas Not Confirmed',
                'Specializations': 'Specializations',
                'Faculties': 'Faculties',
                'Univirsties': 'Univirsties',
                'UnivirstiesNotConfirmed': 'Univirsties Not Confirmed',
                'Applicants': 'Applicants',
                'Login': 'Login',
                'Register': 'Register ',
                'Packages': 'Packages',
                'Features': 'Features',
                'Candidates': 'Candidates'

            },
            "Footer": {
                "Copy": " \u00A9 2016 Empower Corp International Ltd."
            },
            "AccordionHeader": {
                'Location': 'Location',
                'Country': 'Country',
                'City': 'City',
                'Area': 'Area',
                'JobClassification': 'Job Classification',
                'Industry': 'Industry',
                'JobRole': 'Job Role',
                'JobType': 'Job Type',
                'JobDetails': 'Job Details',
                'EducationalLevel': 'Educational Level',
                'CareerLevel': 'Career Level',
                'Dates': 'Dates',
                'BirthDate': 'Birth Date'
            },
            'Package': {
                "Name": "Name",
                "Type": "Type",
                "Features": "Features",
                "Costs": "Costs"
            },
            'Feature': {
                "Name": "Name",
                "Code": "Code",
                "Type": "Type"
            },
            'PackageFeature': {
                "Points": "Points",
                "Feature": "Feature"
            },
            'PackageCost': {
                "PeriodFromByMonth": "Period From By Month",
                "PeriodToByMonth": "Period To By Month",
                "CostPerMonth": "Cost Per Month"
            },
            'UserPackage': {
                "NoOfMonths": "No Of Months",
                "Discount": "Discount",
                "TotalAmount": "Total Amount",
                "PackageAmount": "Package Amount",
                "StartDate": "Start Date",
                "ExpiryDate": "Expiry Date",
                "Package": "Package"
            },
            'UserFeature': {
                "Points": "Points",
                "DistrbuitedForSubUsers": "Distrbuited For Sub Users",
                "UsedFromPoints": "Used From Points",
                "Package": "Package",
                "Feature": "Feature",
                "ExpiryDate": "Expiry Date",
                "User": "User"
            },
            'Applicant': {
                "ArrangeInterviewLocation": "Interview Location",
                "ArrangeInterviewDate": "Interview Date",
                "ArrangeInterviewTime": "Interview Time"
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
            "FacebookSignin": "تسجيل الدخول عن طريق الفيس بوك",
            "GoogleSignin": "تسجيل الدخول عن طريق جوجل",
            "Agreement": "أوافق على الشروط والأحكام",
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
                "Country": "الدولة",
                "Photo": "الصورة"
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
                'PeriodOfEnrollment': 'مهلة ترك الشركة الحالية',
                'MoreInformation': 'معلومات اضافية',
                'Job Preferences': 'خيارات الوظيفة'
            },
            'City': {
                "City": "المدينة",
                "Name": "الاسم",
                "Country": "البلد",
                "Confirmed": "تاكيد"
            },
            'Area': {
                "Area": "المنطقة",
                "City": "المدينة",
                "Name": "الاسم",
                "Confirmed": "تاكيد"
            },
            "Vacancy": {
                "Vacancy": "فرصة عمل",
                "JobTitle": "عنوان الوظيفة",
                "JobDescrption": "وصف الوظيفة",
                "AvailableFrom": "متاحة من",
                "AvailableTo": "متاحة الى",
                "SalaryRangeFrom": "المرتب من ",
                "SalaryRangeTo": " الى",
                "SalaryCurancy": "عملة المرتب",
                "RequiredExperiance": "الخبرة المطلوبة",
                "JobType": "نوع الوظيفة",
                "JobRole": "مجال الوظيفة",
                "Industry": "قطاع العمل",
                "Country": "الدولة",
                "City": "المدينة",
                'EducationalLevel': 'مستوي التعليم',
                'CareerLevel': 'مستوي الوظيفة',
                'HotJobFlag': 'وظيفة مهمة',
                'Area': 'المنطقة',
                'NoData': 'لا يوجد وظائف للعرض',
                'JobRequirements': 'المتطلبات',
                'Benfits': 'المزايا',
                'HideSalary': 'اخفاءالمرتب',
                'ReciveApplicationsByEmail': 'استلام الطلبات عن طريق الايميل',
                'HideCompany': 'اخفاء بيانات الشركة',
                'SendRecommendedCandidatesDailyOrWeekly': 'ارسال المرشحين يوميا أو اسبوعيا'
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
                "ModifiedBy": "عدل بواسطة",
                "Package": "الحزمة",
                'Features': 'الخواص'
            },
            "Industry": {
                "Name": "الأسم"
            },
            "Specialization": {
                "Name": "الأسم"
            },
            "Faculty": {
                "Name": "الأسم"
            },
            "Univirstynivirsty": {
                "Name": "الأسم"
            },
            "JobType": {
                "Name": "نوع الوظيفة"
            },
            "JobRole": {
                "Name": "نوع المجال"
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
                "Name": "الأسم"
            },
            "InnerPage": {
                "PageTitle": "عنوان الصفحة",
                "PageBody": "تفاصيل الصفحة"
            },
            'EducationalInformation': {
                'Educational Level': 'المرحلة التعليمية',
                'Univirsty': 'الجامعة',
                'Faculty': 'الكلية',
                'Specialization': 'التخصص',
                'Grade': 'التقدير'
            }, 'EducationalLevel': {
                "Name": "الأسم"
            },
            'Course': {
                'Title': 'اسم الدورة',
                'TrainingCenter': 'مركز التدريب',
                'Specialization': 'التخصص',
                'Grade': 'التقدير',
                'CourseYear': 'السنة'
            },
            'Main': {
                'Empower': 'ايم باور',
                'Welcome': 'مرحبا بكم فى الموقع',
                'Search1': 'ابحث عن أفضل',
                'Search2': 'الوظائف فى مصر',
                'Search3': 'بحث عن وظائف مثلا مبيعات القاهرة',
                'Messge1': '1- تسجيل مستخدم جديد',
                'Messge2': '2. ابحث عن وظيفتك المفضله',
                'Messge3': '3. ارسل بياناتك للشركات'
            },
            "Buttons": {
                "ArrangeInterview":"تنظيم مقابلة",
                "Update": "تعديل",
                "Save": "حفظ",
                "Cancel": "الغاء",
                "Delete": "حذف",
                "Add": "اضافة جديد",
                "Select": "اختر",
                "Apply": "التقدم للوظيفة",
                "Search": "بحث",
                "NewAddress": "عنوان جديد",
                "Change Password": "تغيير كلمة السر",
                "Reset Password": "ارسال ميل",
                'Previous': 'السابق',
                'Next': 'التالي',
                'First': 'الاول',
                'Last': 'الاخير',
                'Finish': 'تم',
                "Accept": "موافق",
                "Reject": "رفض",
                "Rollback": "رجوع",
                "ShortList": "قائمة مختصره",
                "Approve": "مقبول"
            },
            "Menu": {
                "SubTitle": "وظائف فى مصر",
                "Home": "الرئيسية",
                "Jobs": "الوظائف",
                "Employers": "الشركات",
                "Vacancies": "فرص العمل",
                "ContactUs": "اتصل بنا",
                "AboutUs": "عنا",
                "MyProfile": "بيانات المستخدم",
                "SearchJobs": "بحث في الوظائف",
                "Users": "المستخدمين",
                "Industries": "قطاعات العمل",
                "JobTypes": "انواع الوظائف",
                "JobRoles": "مجالات الوظائف",
                "InnerPages": "الصفحات الداخلية",
                "JobSeekers": "الباحثين عن العمل",
                "Signout": "تسجيل الخروج",
                "PostJob": "أعلن عن وظيفة",
                "UserMenu": "قائمة المستخدم",
                "EducationalLevels": "المستويات التعليمية",
                "Categories": "التصنيفات",
                "CompanyProfile": "بيانات الشركة",
                "InviteSubUser": "دعوة المستخدمين",
                "SignUpSubUser": "SignUpSubUser",
                "subUserFeatures": "SubUserFeatures",
                "Experiances": "الخبرات",
                'SelectValue': 'اختار من القائمة',
                'JobSeekerProfile': 'بيانات طالب العمل',
                'Cities': 'المدن',
                'Areas': 'المناطق',
                'Specializations': 'التخصصات',
                'Faculties': 'الكليات',
                'Univirsties': 'الجامعات',
                'CitiesNotConfirmed': 'المدن التي لم يتم تاكيدها',
                'AreassNotConfirmed': 'المناطق التي لم يتم تاكيدها',
                'UnivirstiesNotConfirmed': 'الجامعات التي لم يتم تاكيدها',
                'Applicants': 'متقدم لوظيفه',
                'Login': 'تسجيل الدخول',
                'Register': 'تسجيل ',
                'Features': 'الخواص',
                'Packages': 'الحزم',
                'Candidates': 'المرشحين'

            },
            "Footer": {
                "Copy": "\u00A9" + " شركة ايم باور 2016"
            },
            "AccordionHeader": {
                'Location': 'الموقع',
                'Country': 'البلد',
                'City': 'المدينة',
                'Area': 'المنطقة',
                'JobClassification': 'تصنيف الوظائف',
                'Industry': 'صناعة',
                'JobRole': 'الدور الوظيفي',
                'JobType': 'نوع الوظيفة',
                'JobDetails': 'تفاصيل الوظيفة',
                'EducationalLevel': 'المستوى التعليمي',
                'CareerLevel': 'المستوى الوظيفي',
                'Dates': 'التواريخ',
                'BirthDate' : 'تاريخ الميلاد'
            },
            'Package': {
                "Name": "الأسم",
                "Type": "النوع",
                "Features": "الخواص",
                "Costs": "القيم"
            },
            'Feature': {
                "Name": "الأسم",
                "Code": "Code",
                "Type": "النوع"
            },
            'PackageFeature': {
                "Points": "النقاط",
                "Feature": "الخاصية"
            },
            'PackageCost': {
                "PeriodFromByMonth": "بداية الفترة بالشهورر",
                "PeriodToByMonth": "نهاية الفترة بالشهور",
                "CostPerMonth": "القيمة الشهر"
            },
            'UserPackage': {
                "NoOfMonths": "عدد الاشهر",
                "Discount": "الخصم",
                "TotalAmount": "القيمة الكلية",
                "PackageAmount": "قيمة الحزمة",
                "StartDate": "تاريخ البداية",
                "ExpiryDate": "تاريخ النهاية",
                "Package": "الحزمة"
            },
            'UserFeature': {
                "Points": "النقاط",
                "DistrbuitedForSubUsers": "الموزع علي المستخدمين التابعين",
                "UsedFromPoints": "المستخدم من النقاط",
                "Package": "الحزمة",
                "Feature": "الخاصية",
                "ExpiryDate": "تاريخ النهاية",
                "User": "المستخدم"
            },
            'Applicant': {
                "ArrangeInterviewLocation": "مكان المقابلة",
                "ArrangeInterviewDate": "تاريخ المقابلة",
                "ArrangeInterviewTime": "وقت المقابلة"
            }
        };
        
        
        
        $translateProvider.translations('en', english);
        $translateProvider.translations('ar', arabic);
        
        $translateProvider.registerAvailableLanguageKeys(['en', 'ar'], {
            'en-US': 'en',
            'ar-EG': 'ar'
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
