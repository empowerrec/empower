angular.module('app').factory('mvMembershipAndAwardRepo', function ($http, $q, mvMembershipAndAward,mvIdentity) {
    return {

        createMembershipAndAward: function (newMembershipAndAwardData) {
            var newMembershipAndAward = new mvMembershipAndAward(newMembershipAndAwardData);
            newMembershipAndAward.CreatedBy = mvIdentity.currentUser;
            var dfd = $q.defer();
            console.log("Saving MembershipAndAward");
            newMembershipAndAward.$save().then(function () {
                console.log("MembershipAndAward Saved");
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        createMembershipAndAwardAfterCreatingUser: function (newMembershipAndAwardData) {
            var newMembershipAndAward = new mvMembershipAndAward(newMembershipAndAwardData);
            var dfd = $q.defer();
            console.log("Saving MembershipAndAward");
            newMembershipAndAward.$save().then(function (membershipAndAward) {
                console.log("MembershipAndAward Saved");
                mvIdentity.currentMembershipAndAward = membershipAndAward;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentMembershipAndAward: function (newMembershipAndAwardData) {
            newMembershipAndAwardData.ModifiedBy = mvIdentity.currentUser;

            var dfd = $q.defer();

            var clone = angular.copy(newMembershipAndAwardData);
            angular.extend(clone,newMembershipAndAwardData);
            clone.$update({currentUser:mvIdentity.currentUser}).then(function () {

                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }
    };
});