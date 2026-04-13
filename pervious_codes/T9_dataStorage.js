// Simple data storage using JavaScript object (no localStorage)

var dataStorage = (function () {
    // Private arrays to store data
    var feedbacks = [];
    var returns = [];
    var emails = [];

    // Public methods
    return {
        // Feedback methods
        saveFeedback: function (feedback) {
            feedbacks.push(feedback);
            console.log('Feedback saved:', feedback);
        },

        getFeedbacks: function () {
            return feedbacks;
        },

        // Return methods
        saveReturn: function (returnRequest) {
            returns.push(returnRequest);
            console.log('Return saved:', returnRequest);
        },

        getReturns: function () {
            return returns;
        },

        saveAllReturns: function (allReturns) {
            returns = allReturns;
            console.log('All returns updated');
        },

        // Email methods
        saveEmail: function (email) {
            emails.unshift(email);
            if (emails.length > 10) {
                emails.pop();
            }
            console.log('Email saved:', email);
        },

        getEmails: function () {
            return emails;
        },

        // Clear all data (optional)
        clearAllData: function () {
            feedbacks = [];
            returns = [];
            emails = [];
            console.log('All data cleared');
            alert('All data has been cleared!');
        },

        // Display all data (for debugging)
        displayAllData: function () {
            console.log('Feedbacks:', feedbacks);
            console.log('Returns:', returns);
            console.log('Emails:', emails);
        }
    };
})();