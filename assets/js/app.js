// AI Learning Hub JavaScript
class AILearningHub {
    constructor() {
        this.data = this.loadData();
        this.initializeEventListeners();
        this.initializeCharts();
        this.updateDashboard();
        this.generateCalendar();
        this.checkReminders();
    }

    // Data Management
    loadData() {
        const defaultData = {
            modules: {
                'ai-fundamentals': { status: 'not-started', progress: 0, timeSpent: 0, startDate: null, completedDate: null },
                'mathematics': { status: 'not-started', progress: 0, timeSpent: 0, startDate: null, completedDate: null },
                'programming': { status: 'not-started', progress: 0, timeSpent: 0, startDate: null, completedDate: null },
                'data-handling': { status: 'not-started', progress: 0, timeSpent: 0, startDate: null, completedDate: null },
                'ml-basics': { status: 'locked', progress: 0, timeSpent: 0, startDate: null, completedDate: null },
                'supervised-learning': { status: 'locked', progress: 0, timeSpent: 0, startDate: null, completedDate: null },
                'unsupervised-learning': { status: 'locked', progress: 0, timeSpent: 0, startDate: null, completedDate: null },
                'ml-projects': { status: 'locked', progress: 0, timeSpent: 0, startDate: null, completedDate: null },
                'neural-networks': { status: 'locked', progress: 0, timeSpent: 0, startDate: null, completedDate: null },
                'cnn': { status: 'locked', progress: 0, timeSpent: 0, startDate: null, completedDate: null },
                'nlp': { status: 'locked', progress: 0, timeSpent: 0, startDate: null, completedDate: null },
                'advanced-dl': { status: 'locked', progress: 0, timeSpent: 0, startDate: null, completedDate: null }
            },
            goals: [
                {
                    id: 'goal-1',
                    title: 'Master AI Fundamentals',
                    description: 'Complete the first phase of the curriculum',
                    priority: 'high',
                    deadline: '2025-09-15',
                    completed: false,
                    createdDate: '2025-08-14'
                }
            ],
            streak: 0,
            lastStudyDate: null,
            totalHours: 0,
            achievements: [],
            reminders: {
                enabled: true,
                time: '19:00',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
            },
            activities: [
                {
                    id: 'activity-1',
                    text: 'Welcome to your AI learning journey!',
                    date: new Date().toISOString(),
                    type: 'system'
                }
            ]
        };

        const saved = localStorage.getItem('aiLearningData');
        return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
    }

    saveData() {
        localStorage.setItem('aiLearningData', JSON.stringify(this.data));
    }

    // Event Listeners
    initializeEventListeners() {
        // Navigation
        this.initializeNavigation();
        
        // Module interactions
        this.initializeModuleInteractions();
        
        // Goal management
        this.initializeGoalManagement();
        
        // Reminder settings
        this.initializeReminderSettings();
        
        // Responsive navigation
        this.initializeResponsiveNav();
    }

    initializeNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').substring(1);
                this.scrollToSection(target);
            });
        });
    }

    initializeModuleInteractions() {
        document.querySelectorAll('.module-card').forEach(card => {
            const moduleId = card.dataset.module;
            const module = this.data.modules[moduleId];
            
            if (module && module.status !== 'locked') {
                card.addEventListener('click', () => {
                    this.openModule(moduleId);
                });
            }
        });
    }

    initializeGoalManagement() {
        const goalForm = document.getElementById('goalForm');
        if (goalForm) {
            goalForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addGoal();
            });
        }
    }

    initializeReminderSettings() {
        const reminderForm = document.getElementById('reminderForm');
        if (reminderForm) {
            reminderForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.setReminders();
            });
        }
    }

    initializeResponsiveNav() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }
    }

    // Dashboard Updates
    updateDashboard() {
        this.updateProgress();
        this.updateStats();
        this.updateModuleStates();
        this.updateActivities();
        this.updateGoals();
        this.updateAchievements();
    }

    updateProgress() {
        const totalModules = Object.keys(this.data.modules).length;
        const completedModules = Object.values(this.data.modules).filter(m => m.status === 'completed').length;
        const progressPercentage = Math.round((completedModules / totalModules) * 100);

        // Update hero stats
        document.getElementById('totalModules').textContent = totalModules;
        document.getElementById('completedModules').textContent = completedModules;
        document.getElementById('progressPercentage').textContent = `${progressPercentage}%`;

        // Update dashboard progress
        document.getElementById('dashboardProgress').textContent = `${progressPercentage}%`;
        
        // Update progress circle
        const circle = document.getElementById('progressCircle');
        if (circle) {
            const circumference = 2 * Math.PI * 50;
            const offset = circumference - (progressPercentage / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        }

        // Update phase progress
        this.updatePhaseProgress();
    }

    updatePhaseProgress() {
        const phases = {
            1: ['ai-fundamentals', 'mathematics', 'programming', 'data-handling'],
            2: ['ml-basics', 'supervised-learning', 'unsupervised-learning', 'ml-projects'],
            3: ['neural-networks', 'cnn', 'nlp', 'advanced-dl']
        };

        Object.entries(phases).forEach(([phase, modules]) => {
            const completed = modules.filter(m => this.data.modules[m].status === 'completed').length;
            const total = modules.length;
            const percentage = Math.round((completed / total) * 100);

            const progressBar = document.querySelector(`[data-phase="${phase}"]`);
            const progressText = progressBar?.parentElement.querySelector('.progress-text');

            if (progressBar) {
                progressBar.style.width = `${percentage}%`;
            }
            if (progressText) {
                progressText.textContent = `${completed}/${total} modules`;
            }
        });
    }

    updateStats() {
        // Update streak
        this.calculateStreak();
        document.getElementById('streakDays').textContent = this.data.streak;

        // Update total hours
        const totalHours = Object.values(this.data.modules).reduce((sum, module) => sum + module.timeSpent, 0);
        document.getElementById('totalHours').textContent = Math.round(totalHours);

        // Update next topic
        const nextModule = this.getNextModule();
        document.getElementById('nextTopic').textContent = nextModule ? this.getModuleName(nextModule) : 'All Complete!';
    }

    calculateStreak() {
        const today = new Date();
        const lastStudy = this.data.lastStudyDate ? new Date(this.data.lastStudyDate) : null;
        
        if (!lastStudy) {
            this.data.streak = 0;
            return;
        }

        const diffTime = Math.abs(today - lastStudy);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 1) {
            // Streak continues
            if (diffDays === 1) {
                this.data.streak += 1;
            }
        } else {
            // Streak broken
            this.data.streak = 0;
        }
    }

    updateModuleStates() {
        document.querySelectorAll('.module-card').forEach(card => {
            const moduleId = card.dataset.module;
            const module = this.data.modules[moduleId];
            
            if (module) {
                const statusElement = card.querySelector('.status');
                statusElement.className = `status ${module.status}`;
                statusElement.textContent = this.formatStatus(module.status);

                // Update module card appearance
                card.className = `module-card ${module.status}`;

                // Update buttons
                const actions = card.querySelector('.module-actions');
                if (module.status === 'locked') {
                    actions.innerHTML = '<button class="btn btn-disabled" disabled>Complete Prerequisites</button>';
                } else {
                    const moduleName = this.getModuleName(moduleId);
                    actions.innerHTML = `
                        <a href="notebooks/${moduleId}.html" class="btn btn-primary">Start Learning</a>
                        <a href="https://colab.research.google.com/github/murali-marimekala/AIExplorationHub/blob/main/notebooks/${moduleId.replace('-', '_')}.ipynb" class="btn btn-secondary" target="_blank">
                            <i class="fab fa-google"></i> Colab
                        </a>
                    `;
                }
            }
        });

        // Unlock next modules based on completion
        this.unlockModules();
    }

    unlockModules() {
        const moduleOrder = [
            ['ai-fundamentals', 'mathematics', 'programming', 'data-handling'],
            ['ml-basics', 'supervised-learning', 'unsupervised-learning', 'ml-projects'],
            ['neural-networks', 'cnn', 'nlp', 'advanced-dl']
        ];

        moduleOrder.forEach((phase, phaseIndex) => {
            if (phaseIndex === 0) {
                // First phase is always unlocked
                phase.forEach(moduleId => {
                    if (this.data.modules[moduleId].status === 'locked') {
                        this.data.modules[moduleId].status = 'not-started';
                    }
                });
            } else {
                // Check if previous phase is completed
                const previousPhase = moduleOrder[phaseIndex - 1];
                const previousCompleted = previousPhase.every(moduleId => 
                    this.data.modules[moduleId].status === 'completed'
                );

                if (previousCompleted) {
                    phase.forEach(moduleId => {
                        if (this.data.modules[moduleId].status === 'locked') {
                            this.data.modules[moduleId].status = 'not-started';
                        }
                    });
                }
            }
        });
    }

    updateActivities() {
        const activityList = document.getElementById('activityList');
        if (activityList) {
            activityList.innerHTML = this.data.activities
                .slice(-5) // Show last 5 activities
                .reverse()
                .map(activity => `
                    <div class="activity-item">
                        <i class="fas fa-${this.getActivityIcon(activity.type)}"></i>
                        <span>${activity.text}</span>
                        <time>${this.formatDate(activity.date)}</time>
                    </div>
                `).join('');
        }
    }

    updateGoals() {
        const goalsList = document.getElementById('goalsList');
        if (goalsList) {
            const activeGoals = this.data.goals.filter(goal => !goal.completed);
            
            if (activeGoals.length === 0) {
                goalsList.innerHTML = `
                    <div class="goal-item">
                        <div class="goal-content">
                            <p>No active goals. Add one using the form!</p>
                        </div>
                    </div>
                `;
            } else {
                goalsList.innerHTML = activeGoals.map(goal => `
                    <div class="goal-item">
                        <div class="goal-content">
                            <h4>${goal.title}</h4>
                            <p>${goal.description}</p>
                            <div class="goal-meta">
                                <span class="priority ${goal.priority}">${goal.priority} Priority</span>
                                <span class="deadline">Due: ${this.formatDate(goal.deadline)}</span>
                            </div>
                        </div>
                        <div class="goal-actions">
                            <button class="btn-icon" onclick="aiHub.completeGoal('${goal.id}')">
                                <i class="fas fa-check"></i>
                            </button>
                            <button class="btn-icon" onclick="aiHub.deleteGoal('${goal.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('');
            }
        }
    }

    updateAchievements() {
        const achievements = [
            { id: 'first-module', icon: 'trophy', name: 'First Module', condition: () => Object.values(this.data.modules).some(m => m.status === 'completed') },
            { id: 'streak-7', icon: 'fire', name: '7-Day Streak', condition: () => this.data.streak >= 7 },
            { id: 'hours-100', icon: 'clock', name: '100 Hours', condition: () => Object.values(this.data.modules).reduce((sum, m) => sum + m.timeSpent, 0) >= 100 },
            { id: 'ai-expert', icon: 'graduation-cap', name: 'AI Expert', condition: () => Object.values(this.data.modules).every(m => m.status === 'completed') }
        ];

        achievements.forEach(achievement => {
            const element = document.querySelector(`.achievement:nth-child(${achievements.indexOf(achievement) + 1})`);
            if (element) {
                if (achievement.condition()) {
                    element.classList.remove('locked');
                    element.classList.add('unlocked');
                    
                    if (!this.data.achievements.includes(achievement.id)) {
                        this.data.achievements.push(achievement.id);
                        this.showNotification(`Achievement Unlocked: ${achievement.name}!`, 'success');
                        this.addActivity(`Unlocked achievement: ${achievement.name}`, 'achievement');
                    }
                }
            }
        });
    }

    // Module Management
    openModule(moduleId) {
        if (this.data.modules[moduleId].status === 'not-started') {
            this.data.modules[moduleId].status = 'in-progress';
            this.data.modules[moduleId].startDate = new Date().toISOString();
            this.addActivity(`Started module: ${this.getModuleName(moduleId)}`, 'module-start');
        }

        // Update last study date for streak
        this.data.lastStudyDate = new Date().toISOString();
        
        this.saveData();
        this.updateDashboard();
    }

    completeModule(moduleId) {
        this.data.modules[moduleId].status = 'completed';
        this.data.modules[moduleId].completedDate = new Date().toISOString();
        this.addActivity(`Completed module: ${this.getModuleName(moduleId)}`, 'module-complete');
        
        this.saveData();
        this.updateDashboard();
        this.showNotification(`Module completed: ${this.getModuleName(moduleId)}!`, 'success');
    }

    // Goal Management
    addGoal() {
        const title = document.getElementById('goalTitle').value;
        const deadline = document.getElementById('goalDeadline').value;
        const priority = document.getElementById('goalPriority').value;

        if (!title || !deadline) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        const goal = {
            id: `goal-${Date.now()}`,
            title,
            description: `Custom goal: ${title}`,
            priority,
            deadline,
            completed: false,
            createdDate: new Date().toISOString()
        };

        this.data.goals.push(goal);
        this.addActivity(`Added new goal: ${title}`, 'goal');
        
        // Clear form
        document.getElementById('goalForm').reset();
        
        this.saveData();
        this.updateGoals();
        this.showNotification('Goal added successfully!', 'success');
    }

    completeGoal(goalId) {
        const goal = this.data.goals.find(g => g.id === goalId);
        if (goal) {
            goal.completed = true;
            this.addActivity(`Completed goal: ${goal.title}`, 'goal-complete');
            this.saveData();
            this.updateGoals();
            this.showNotification('Goal completed! Well done!', 'success');
        }
    }

    deleteGoal(goalId) {
        this.data.goals = this.data.goals.filter(g => g.id !== goalId);
        this.saveData();
        this.updateGoals();
        this.showNotification('Goal deleted', 'warning');
    }

    // Reminder Management
    setReminders() {
        const time = document.getElementById('reminderTime').value;
        const days = Array.from(document.querySelectorAll('#reminderForm input[type="checkbox"]:checked'))
                          .map(cb => cb.value);

        this.data.reminders = { enabled: true, time, days };
        this.saveData();
        this.showNotification('Reminders updated!', 'success');
        
        // Set up browser notifications if supported
        if ('Notification' in window) {
            Notification.requestPermission();
        }
    }

    checkReminders() {
        if (!this.data.reminders.enabled) return;

        const now = new Date();
        const currentDay = now.toLocaleLowerCase().substring(0, 3) + 'day';
        const currentTime = now.toTimeString().substring(0, 5);

        if (this.data.reminders.days.includes(currentDay) && 
            currentTime === this.data.reminders.time) {
            this.showNotification("Time to study! Don't break your streak!", 'info');
        }
    }

    // Calendar
    generateCalendar() {
        const calendar = document.getElementById('studyCalendar');
        if (!calendar) return;

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();

        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];

        let calendarHTML = `
            <div class="calendar-header">
                ${monthNames[month]} ${year}
            </div>
            <div class="calendar-grid">
        `;

        // Day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            calendarHTML += `<div class="calendar-day-header">${day}</div>`;
        });

        // Empty cells for days before month starts
        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarHTML += '<div class="calendar-day empty"></div>';
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isToday = date.toDateString() === now.toDateString();
            const hasStudy = this.hasStudyOnDate(date);

            let classes = 'calendar-day';
            if (isToday) classes += ' today';
            if (hasStudy) classes += ' has-study';

            calendarHTML += `<div class="${classes}">${day}</div>`;
        }

        calendarHTML += '</div>';
        calendar.innerHTML = calendarHTML;
    }

    hasStudyOnDate(date) {
        // Check if any module was worked on this date
        const dateStr = date.toDateString();
        return this.data.activities.some(activity => 
            new Date(activity.date).toDateString() === dateStr && 
            activity.type.includes('module')
        );
    }

    // Charts
    initializeCharts() {
        this.initializeWeeklyChart();
        this.initializeModuleChart();
        this.initializeTimeChart();
    }

    initializeWeeklyChart() {
        const ctx = document.getElementById('weeklyChart');
        if (!ctx) return;

        const weekData = this.getWeeklyData();
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Study Hours',
                    data: weekData,
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    initializeModuleChart() {
        const ctx = document.getElementById('moduleChart');
        if (!ctx) return;

        const moduleData = this.getModuleCompletionData();
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'In Progress', 'Not Started'],
                datasets: [{
                    data: moduleData,
                    backgroundColor: ['#10b981', '#f59e0b', '#e5e7eb']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    initializeTimeChart() {
        const ctx = document.getElementById('timeChart');
        if (!ctx) return;

        const timeData = this.getTimeSpentData();
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Hours',
                    data: timeData,
                    backgroundColor: '#06b6d4'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Utility Functions
    getNextModule() {
        const modules = Object.keys(this.data.modules);
        return modules.find(moduleId => 
            this.data.modules[moduleId].status === 'not-started' || 
            this.data.modules[moduleId].status === 'in-progress'
        );
    }

    getModuleName(moduleId) {
        const names = {
            'ai-fundamentals': 'AI Fundamentals',
            'mathematics': 'Mathematics for AI',
            'programming': 'Python for AI',
            'data-handling': 'Data Handling',
            'ml-basics': 'ML Fundamentals',
            'supervised-learning': 'Supervised Learning',
            'unsupervised-learning': 'Unsupervised Learning',
            'ml-projects': 'ML Projects',
            'neural-networks': 'Neural Networks',
            'cnn': 'Computer Vision',
            'nlp': 'Natural Language Processing',
            'advanced-dl': 'Advanced Deep Learning'
        };
        return names[moduleId] || moduleId;
    }

    formatStatus(status) {
        const statuses = {
            'not-started': 'Not Started',
            'in-progress': 'In Progress',
            'completed': 'Completed',
            'locked': 'Locked'
        };
        return statuses[status] || status;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        
        return date.toLocaleDateString();
    }

    getActivityIcon(type) {
        const icons = {
            'system': 'info-circle',
            'module-start': 'play',
            'module-complete': 'check-circle',
            'goal': 'target',
            'goal-complete': 'trophy',
            'achievement': 'star'
        };
        return icons[type] || 'circle';
    }

    getWeeklyData() {
        // Generate sample weekly data
        return [2, 3, 1, 4, 2, 0, 1];
    }

    getModuleCompletionData() {
        const modules = Object.values(this.data.modules);
        const completed = modules.filter(m => m.status === 'completed').length;
        const inProgress = modules.filter(m => m.status === 'in-progress').length;
        const notStarted = modules.filter(m => m.status === 'not-started').length;
        
        return [completed, inProgress, notStarted];
    }

    getTimeSpentData() {
        // Generate sample time data
        return [8, 12, 15, 10];
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    addActivity(text, type = 'system') {
        this.data.activities.push({
            id: `activity-${Date.now()}`,
            text,
            date: new Date().toISOString(),
            type
        });

        // Keep only last 20 activities
        if (this.data.activities.length > 20) {
            this.data.activities = this.data.activities.slice(-20);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }
}

// Global functions for HTML event handlers
function completeGoal(goalId) {
    window.aiHub.completeGoal(goalId);
}

function deleteGoal(goalId) {
    window.aiHub.deleteGoal(goalId);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.aiHub = new AILearningHub();
    
    // Set up periodic checks
    setInterval(() => {
        window.aiHub.checkReminders();
    }, 60000); // Check every minute
    
    // Auto-save data periodically
    setInterval(() => {
        window.aiHub.saveData();
    }, 300000); // Save every 5 minutes
});

// Handle page visibility for streak tracking
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        window.aiHub.updateDashboard();
    }
});
