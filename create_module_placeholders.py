#!/usr/bin/env python3
"""
Create placeholder HTML files for upcoming modules
"""

import os

# Module definitions
modules = [
    {
        'filename': 'python-for-ai.html',
        'title': 'Python for AI',
        'icon': 'fab fa-python',
        'description': 'Master Python programming for artificial intelligence and machine learning',
        'features': [
            'NumPy for numerical computing',
            'Pandas for data manipulation', 
            'Matplotlib for visualization',
            'Scikit-learn for machine learning',
            'Python best practices',
            'AI project workflow'
        ]
    },
    {
        'filename': 'data-handling.html', 
        'title': 'Data Handling',
        'icon': 'fas fa-database',
        'description': 'Learn essential data collection, cleaning, and preprocessing techniques',
        'features': [
            'Data collection techniques',
            'Data cleaning and preprocessing',
            'Feature engineering',
            'Data visualization strategies',
            'Handling missing data',
            'Data quality assessment'
        ]
    },
    {
        'filename': 'ml-fundamentals.html',
        'title': 'ML Fundamentals', 
        'icon': 'fas fa-cogs',
        'description': 'Understand core machine learning concepts and methodologies',
        'features': [
            'Machine learning algorithms overview',
            'Model selection and evaluation',
            'Cross-validation techniques',
            'Bias-variance tradeoff',
            'Performance metrics',
            'ML workflow best practices'
        ]
    },
    {
        'filename': 'supervised-learning.html',
        'title': 'Supervised Learning',
        'icon': 'fas fa-chart-line', 
        'description': 'Master supervised learning algorithms and techniques',
        'features': [
            'Linear and logistic regression',
            'Decision trees and random forests',
            'Support vector machines',
            'Ensemble methods',
            'Model evaluation',
            'Hyperparameter tuning'
        ]
    },
    {
        'filename': 'unsupervised-learning.html',
        'title': 'Unsupervised Learning',
        'icon': 'fas fa-search',
        'description': 'Explore pattern discovery and unsupervised learning methods',
        'features': [
            'Clustering algorithms (K-means, hierarchical)',
            'Dimensionality reduction (PCA, t-SNE)',
            'Association rule learning',
            'Anomaly detection',
            'Clustering validation',
            'Feature selection'
        ]
    },
    {
        'filename': 'ml-projects.html',
        'title': 'ML Projects',
        'icon': 'fas fa-project-diagram',
        'description': 'Apply machine learning skills to real-world projects',
        'features': [
            'End-to-end project workflow',
            'Real-world case studies',
            'Model deployment basics',
            'Best practices and tips',
            'Project portfolio building',
            'Industry applications'
        ]
    },
    {
        'filename': 'neural-networks.html',
        'title': 'Neural Networks',
        'icon': 'fas fa-brain',
        'description': 'Dive deep into neural networks and deep learning fundamentals',
        'features': [
            'Perceptrons and multi-layer networks',
            'Backpropagation algorithm',
            'Activation functions',
            'Optimization techniques',
            'Regularization methods',
            'Neural network architectures'
        ]
    },
    {
        'filename': 'computer-vision.html',
        'title': 'Computer Vision',
        'icon': 'fas fa-eye',
        'description': 'Learn to build AI systems that can see and understand images',
        'features': [
            'Convolutional Neural Networks (CNNs)',
            'Image preprocessing and augmentation',
            'Object detection and recognition',
            'Transfer learning',
            'Image classification',
            'Computer vision applications'
        ]
    },
    {
        'filename': 'natural-language-processing.html',
        'title': 'Natural Language Processing',
        'icon': 'fas fa-comments',
        'description': 'Build AI systems that understand and generate human language',
        'features': [
            'Text preprocessing and tokenization',
            'Recurrent Neural Networks (RNNs)',
            'Transformers and attention mechanisms',
            'Language models and applications',
            'Sentiment analysis',
            'Text generation'
        ]
    },
    {
        'filename': 'advanced-deep-learning.html',
        'title': 'Advanced Deep Learning',
        'icon': 'fas fa-rocket',
        'description': 'Explore cutting-edge deep learning techniques and research',
        'features': [
            'Generative Adversarial Networks (GANs)',
            'Reinforcement learning basics',
            'Advanced architectures',
            'Cutting-edge research topics',
            'AI safety and ethics',
            'Future of AI'
        ]
    }
]

def create_module_html(module):
    """Create HTML file for a module"""
    
    features_html = '\n                        '.join([
        f'<li><i class="fas fa-check"></i> {feature}</li>'
        for feature in module['features']
    ])
    
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{module['title']} - AI Learning Hub</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <i class="fas fa-brain"></i>
                    <span>AI Learning Hub</span>
                </div>
                <a href="../index.html" class="btn btn-secondary">
                    <i class="fas fa-arrow-left"></i>
                    Back to Dashboard
                </a>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="container">
            <div class="module-header">
                <h1><i class="{module['icon']}"></i> {module['title']}</h1>
                <p class="module-subtitle">{module['description']}</p>
            </div>

            <div class="coming-soon-card">
                <div class="coming-soon-content">
                    <i class="fas fa-rocket"></i>
                    <h2>Coming Soon!</h2>
                    <p>This module is currently under development. We're creating comprehensive, interactive content covering:</p>
                    
                    <ul class="feature-list">
                        {features_html}
                    </ul>

                    <div class="cta-section">
                        <h3>In the meantime:</h3>
                        <div class="cta-buttons">
                            <a href="../index.html" class="btn btn-primary">
                                <i class="fas fa-chart-line"></i>
                                View Progress Dashboard
                            </a>
                            <a href="01-ai-fundamentals.html" class="btn btn-secondary">
                                <i class="fas fa-play"></i>
                                Start with AI Fundamentals
                            </a>
                        </div>
                    </div>

                    <div class="estimated-release">
                        <i class="fas fa-calendar"></i>
                        <span>Estimated Release: Coming Soon</span>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <style>
        .main {{
            padding: 2rem 0;
            min-height: calc(100vh - 80px);
        }}

        .module-header {{
            text-align: center;
            margin-bottom: 3rem;
        }}

        .module-header h1 {{
            font-size: 2.5rem;
            color: var(--gray-800);
            margin-bottom: 0.5rem;
        }}

        .module-subtitle {{
            font-size: 1.25rem;
            color: var(--gray-600);
        }}

        .coming-soon-card {{
            max-width: 800px;
            margin: 0 auto;
            background: var(--white);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            overflow: hidden;
        }}

        .coming-soon-content {{
            padding: 3rem;
            text-align: center;
        }}

        .coming-soon-content > i {{
            font-size: 4rem;
            color: var(--primary-color);
            margin-bottom: 1.5rem;
        }}

        .coming-soon-content h2 {{
            font-size: 2rem;
            color: var(--gray-800);
            margin-bottom: 1rem;
        }}

        .coming-soon-content > p {{
            font-size: 1.125rem;
            color: var(--gray-600);
            margin-bottom: 2rem;
            line-height: 1.6;
        }}

        .feature-list {{
            list-style: none;
            text-align: left;
            max-width: 400px;
            margin: 2rem auto;
        }}

        .feature-list li {{
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem 0;
            color: var(--gray-700);
        }}

        .feature-list i {{
            color: var(--success-color);
        }}

        .cta-section {{
            margin: 2.5rem 0;
            padding: 2rem;
            background: var(--gray-50);
            border-radius: var(--radius);
        }}

        .cta-section h3 {{
            color: var(--gray-800);
            margin-bottom: 1.5rem;
        }}

        .cta-buttons {{
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }}

        .estimated-release {{
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            color: var(--gray-500);
            font-weight: 500;
        }}

        @media (max-width: 768px) {{
            .coming-soon-content {{
                padding: 2rem 1.5rem;
            }}

            .module-header h1 {{
                font-size: 2rem;
            }}

            .cta-buttons {{
                flex-direction: column;
                align-items: center;
            }}
        }}
    </style>
</body>
</html>"""
    
    return html_content

def main():
    """Create all module HTML files"""
    notebooks_dir = "notebooks"
    
    if not os.path.exists(notebooks_dir):
        os.makedirs(notebooks_dir)
    
    for module in modules:
        filepath = os.path.join(notebooks_dir, module['filename'])
        
        if not os.path.exists(filepath):
            html_content = create_module_html(module)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(html_content)
            
            print(f"✅ Created {module['filename']}")
        else:
            print(f"⚠️  {module['filename']} already exists, skipping")

if __name__ == "__main__":
    main()
