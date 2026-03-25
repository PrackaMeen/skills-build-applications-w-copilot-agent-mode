from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel', description='Team Marvel Superheroes')
        dc = Team.objects.create(name='DC', description='Team DC Superheroes')

        # Users
        users = [
            User(email='tony@stark.com', name='Tony Stark', team='Marvel', is_superhero=True),
            User(email='steve@rogers.com', name='Steve Rogers', team='Marvel', is_superhero=True),
            User(email='bruce@wayne.com', name='Bruce Wayne', team='DC', is_superhero=True),
            User(email='clark@kent.com', name='Clark Kent', team='DC', is_superhero=True),
        ]
        User.objects.bulk_create(users)

        # Activities
        Activity.objects.create(user='Tony Stark', activity_type='Running', duration=30, date=timezone.now())
        Activity.objects.create(user='Steve Rogers', activity_type='Cycling', duration=45, date=timezone.now())
        Activity.objects.create(user='Bruce Wayne', activity_type='Swimming', duration=60, date=timezone.now())
        Activity.objects.create(user='Clark Kent', activity_type='Flying', duration=120, date=timezone.now())

        # Workouts
        Workout.objects.create(name='Super Strength', description='Strength workout for superheroes', difficulty='Hard')
        Workout.objects.create(name='Endurance', description='Endurance workout for superheroes', difficulty='Medium')

        # Leaderboard
        Leaderboard.objects.create(team='Marvel', points=150, rank=1)
        Leaderboard.objects.create(team='DC', points=120, rank=2)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
